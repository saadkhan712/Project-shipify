// To handle payment requests, create an endpoint that initializes a payment with Stripe’s Payment Intent.
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const Shipment = require(".../models/Shipment");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { shipmentId, amount, currency } = req.body;

    // Check if shipment exists
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    // Create a new payment entry in the database
    const payment = new Payment({ shipmentId, amount, currency });
    await payment.save();

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      metadata: { paymentId: payment._id.toString() },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createPaymentIntent };

// Set up Stripe webhooks to monitor the payment status in real time and update your database accordingly.
// controllers/paymentController.js (continued)
const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle payment intent succeeded event
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const paymentId = paymentIntent.metadata.paymentId;

        // Update payment status in the database
        await Payment.findByIdAndUpdate(paymentId, {
            status: 'Completed',
            transactionId: paymentIntent.id,
            updatedAt: Date.now()
        });

        console.log('Payment completed:', paymentId);
    }

    res.json({ received: true });
};

module.exports = { createPaymentIntent, handleWebhook };


// Endpoint for Processing Refunds
// controllers/paymentController.js (continued)
const refundPayment = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const payment = await Payment.findById(paymentId);

        if (!payment || payment.status !== 'Completed') {
            return res.status(400).json({ message: 'Payment not eligible for refund' });
        }

        const refund = await stripe.refunds.create({ payment_intent: payment.transactionId });

        payment.status = 'Refunded';
        payment.updatedAt = Date.now();
        await payment.save();

        res.status(200).json({ message: 'Payment refunded', refund });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createPaymentIntent, handleWebhook, refundPayment };
