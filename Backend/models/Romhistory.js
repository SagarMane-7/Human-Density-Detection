const mongoose = require("mongoose");

const RoomHistorySchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  occupancy: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RoomHistory", RoomHistorySchema);
