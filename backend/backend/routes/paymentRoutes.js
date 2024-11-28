// routes/paymentRoutes.js
const express = require("express");
const { createPaymentIntent } = require("../controllers/paymentController");
const { handleWebhook } = require("../controllers/paymentController");
const { refundPayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/pay", createPaymentIntent);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);
router.post("/refund", refundPayment);

module.exports = router;


