const mongoose=require("mongoose");

const RoomLiveSchema=new mongoose.Schema({
  roomId:{type:String,unique: true },
  count: Number,
  people: [{id:Number, x:Number, y:Number }],
  alerts: {type:String, default: "No Alerts at the Moment" },
  updatedAt:{type: Date, default: Date.now}
});

module.exports=mongoose.model("RoomLive", RoomLiveSchema);
