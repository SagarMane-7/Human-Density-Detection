const mongoose=require("mongoose");

const SensorSchema=new mongoose.Schema({
  sensorId:String,
  x:Number,
  y:Number,
  status:{type:String, default:"Active" }
});

const RoomSchema=new mongoose.Schema({
  roomId: {type:String, unique:true },
  name: String,

  userId: { type: String, required: true },

  dimensions: {
    length:Number,
    width:Number,
    height:Number
  },

  espId:{
    type:String,
    required: true,
    unique: true,
    index: true },

  sensors: [SensorSchema],
  isActive: {type:Boolean,default:true},

  createdAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Room", RoomSchema);
