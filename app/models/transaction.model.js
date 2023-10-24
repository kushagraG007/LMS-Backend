const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer", "Other"],
    required: true,
  },
  // Add other fields as needed, e.g., transaction ID, status, etc.
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
