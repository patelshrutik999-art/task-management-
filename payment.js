// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  stripePaymentIntentId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true }, // in smallest currency unit (e.g., cents)
  currency: { type: String, default: process.env.PAYMENT_CURRENCY || 'usd' },
  status: { type: String, enum: ['created','requires_action','succeeded','failed','canceled'], default: 'created' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }, // optional: which internship payment is for
  metadata: { type: Object }, // store any metadata Stripe returns
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

paymentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
