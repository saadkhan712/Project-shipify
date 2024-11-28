
// Define routes for creating dispatches, and for drivers to accept or decline.
const express = require('express');
const { createDispatch, acceptDispatch, declineDispatch } = require('../controllers/dispatchController');

const router = express.Router();

router.post('/create', createDispatch);
router.patch('/accept', acceptDispatch);
router.patch('/decline', declineDispatch);

module.exports = router;
