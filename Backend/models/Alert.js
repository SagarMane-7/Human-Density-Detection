const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  userId: { type: String, required: true }, 
  message: { type: String, required: true },
  acknowledged: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", AlertSchema);
