const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");

const devices = ["RADAR_D40CDADC", "RADAR_D40CDADD", "RADAR_D40CDAD3"];

function generatePeople() {
  const count = Math.floor(Math.random() * 7) + 1;
  return Array.from({ length: count }, () => ({
    x_mm: Math.floor(Math.random() * 8000 - 4000),
    y_mm: Math.floor(Math.random() * 5000),
    speed_cm_s: Math.floor(Math.random() * 40 - 20)
  }));
}

client.on("connect", () => {
  console.log("Mock ESP32 connected");

  setInterval(() => {
    devices.forEach(device_id => {
      const payload = {
        device_id,
        targets: generatePeople()
      };

      client.publish(
        `building/device/${device_id}/radar`,
        JSON.stringify(payload)
      );

      console.log(`Sent data from ${device_id}, count=${payload.targets.length}`);
    });
  }, 3000);
});
