const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

const rooms = [
  {
    id: "living-room",
    name: "Living Room",
    count: 8,
    isActive: true,
    people: [
      { id: 1, x: 10, y: 20 },
      { id: 2, x: 25, y: 40 },
      { id: 3, x: 50, y: 30 },
      { id: 4, x: 70, y: 50 },
      { id: 5, x: 80, y: 10 },
      { id: 6, x: 60, y: 70 },
      { id: 7, x: 35, y: 80 },
      { id: 8, x: 90, y: 60 },
    ],
    sensors: 3,
    alerts: "No Alerts at the Moment",
    occupancyTrend: [
      { time: "08:00", Occupancy: 20 },
      { time: "10:00", Occupancy: 35 },
      { time: "12:00", Occupancy: 40 },
      { time: "14:00", Occupancy: 30 },
      { time: "16:00", Occupancy: 50 },
      { time: "18:00", Occupancy: 45 },
      { time: "20:00", Occupancy: 38 },
      { time: "22:00", Occupancy: 25 },
    ],
    sensorDetails: [
      { name: "Sensor 1", status: "Active" },
      { name: "Sensor 2", status: "Inactive" },
      { name: "Sensor 3", status: "Active" },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    count: 5,
    isActive: true,
    people: [
      { id: 1, x: 15, y: 30 },
      { id: 2, x: 40, y: 70 },
      { id: 3, x: 60, y: 20 },
      { id: 4, x: 75, y: 60 },
      { id: 5, x: 90, y: 40 },
    ],
    sensors: 2,
    alerts: "Gas leak detected",
    occupancyTrend: [
      { time: "08:00", Occupancy: 10 },
      { time: "12:00", Occupancy: 25 },
      { time: "16:00", Occupancy: 20 },
      { time: "20:00", Occupancy: 15 },
    ],
    sensorDetails: [
      { name: "Smoke Sensor", status: "Active" },
      { name: "Gas Sensor", status: "Active" },
    ],
  },
  {
    id: "bed-room",
    name: "Bed Room",
    count: 3,
    isActive: true,
    people: [
      { id: 1, x: 20, y: 50 },
      { id: 2, x: 50, y: 50 },
      { id: 3, x: 80, y: 60 },
    ],
    sensors: 1,
    alerts: "No Alerts",
    occupancyTrend: [
      { time: "08:00", Occupancy: 5 },
      { time: "12:00", Occupancy: 10 },
      { time: "16:00", Occupancy: 7 },
      { time: "20:00", Occupancy: 3 },
    ],
    sensorDetails: [{ name: "Temperature Sensor", status: "Active" }],
  },
  {
    id: "conference-room",
    name: "Conference Room",
    count: 6,
    isActive: true,
    people: [
      { id: 1, x: 30, y: 20 },
      { id: 2, x: 50, y: 40 },
      { id: 3, x: 70, y: 40 },
      { id: 4, x: 40, y: 70 },
      { id: 5, x: 60, y: 70 },
      { id: 6, x: 80, y: 50 },
    ],
    sensors: 2,
    alerts: "Projector malfunctioning",
    occupancyTrend: [
      { time: "08:00", Occupancy: 15 },
      { time: "12:00", Occupancy: 25 },
      { time: "16:00", Occupancy: 30 },
      { time: "20:00", Occupancy: 20 },
    ],
    sensorDetails: [
      { name: "Motion Sensor", status: "Active" },
      { name: "Camera", status: "Inactive" },
    ],
  },
];

app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});

app.get("/api/rooms/:id", (req, res) => {
  const id = req.params.id;
  const room = rooms.find((r) => r.id === id);
  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
});

app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
