require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mqtt = require("mqtt");
const http = require("http");
const { Server } = require("socket.io");

const authMiddleware = require("./middleware/auth");

const Room = require("./models/Room");
const RoomLive = require("./models/Roomlive");
const RoomHistory = require("./models/Romhistory");
const Alert = require("./models/Alert");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));


app.post("/api/rooms", authMiddleware, async (req, res) => {
  try {
    const { name, dimensions, espId, sensors } = req.body;

    const roomId = name.toLowerCase().replace(/\s+/g, "-");

    await Room.create({
      roomId,
      name,
      dimensions,
      espId,           
      sensors,
      userId: req.user.uid
    });

    await RoomLive.create({
      roomId,
      count: 0,
      people: []
    });

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/rooms", authMiddleware, async (req, res) => {
  const rooms = await Room.find({ userId: req.user.uid });
  const liveRooms = await RoomLive.find();

  const result = rooms.map(room => {
    const live = liveRooms.find(l => l.roomId === room.roomId);
    return {
      id: room.roomId,
      name: room.name,
      isActive: room.isActive,
      count: live?.count || 0,
      people: live?.people || []
    };
  });

  res.json(result);
});

app.get("/api/rooms/:id", authMiddleware, async (req, res) => {
  try {
    const room = await Room.findOne({
      roomId: req.params.id,
      userId: req.user.uid
    });

    if (!room) return res.status(404).json({ error: "Room not found" });

    const live = await RoomLive.findOne({ roomId: room.roomId });

    const history = await RoomHistory.find({ roomId: room.roomId })
      .sort({ timestamp: 1 })
      .limit(150);

    res.json({
      id: room.roomId,
      name: room.name,
      count: live?.count || 0,
      sensors: room.sensors,  
      people: live?.people || [],
      alerts: live?.alerts || "No Alerts",
      occupancyTrend: history
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/alerts", authMiddleware, async (req, res) => {
  const alerts = await Alert.find({ userId: req.user.uid })
    .sort({ createdAt: -1 });
  res.json(alerts);
});

app.patch("/api/alerts/:id", authMiddleware, async (req, res) => {
  await Alert.findByIdAndUpdate(req.params.id, { acknowledged: true });
  res.json({ success: true });
});


const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
  console.log("MQTT connected");
  mqttClient.subscribe("building/device/+/radar");
});

mqttClient.on("message", async (_, message) => {
  try {
    const data = JSON.parse(message.toString());

    const room = await Room.findOne({ espId: data.device_id });
    if (!room) return;

    const roomId = room.roomId;

    const roomLengthMM = room.dimensions.length * 1000;
    const roomWidthMM = room.dimensions.width * 1000;

    const people = data.targets.map((t, i) => ({
      id: i + 1,
      x: Math.min(100, Math.max(0, (t.x_mm / roomLengthMM) * 100)),
      y: Math.min(100, Math.max(0, (t.y_mm / roomWidthMM) * 100))
    }));

    const alertMessage =
      people.length > 5
        ? "Density threshold crossed"
        : "No Alerts at the Moment";

    if (people.length > 5) {
      await Alert.create({
        roomId,
        userId: room.userId,
        message: "Density threshold crossed"
      });
    }

    await RoomLive.updateOne(
      { roomId },
      {
        $set: {
          count: people.length,
          people,
          alerts: alertMessage,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    await RoomHistory.create({
      roomId,
      occupancy: people.length
    });

    io.to(roomId).emit("room-update", {
      roomId,
      people,
      count: people.length,
      alerts: alertMessage
    });

  } catch (err) {
    console.error("MQTT error:", err);
  }
});

setInterval(async() => {
  const FIVE_MINUTES=5*60*1000;
  const now=Date.now();

  const rooms=await RoomLive.find();

  for (const live of rooms) {
    if (!live.updatedAt) continue;

    if (now - new Date(live.updatedAt).getTime() > FIVE_MINUTES) {
      const room = await Room.findOne({ roomId: live.roomId });
      if (!room) continue;

      await Alert.create({
        roomId:live.roomId,
        userId:room.userId,
        message:"Sensor is not sending data"
      });
    }
  }
}, 60 * 1000);


server.listen(5000,() => {
  console.log("Server running on http://localhost:5000");
});
