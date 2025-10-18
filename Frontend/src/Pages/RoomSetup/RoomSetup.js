import { useState, useMemo } from "react";
import { sensorLayout, verifyESP32 } from "./RoomSetup.logic";

export function useRoomSetup() {
  const [roomName, setRoomName] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [espId, setEspId] = useState("");
  const [coverage, setCoverage] = useState(4);
  const [overlapPct, setOverlapPct] = useState(0.1);

  const [verifyStatus, setVerifyStatus] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  // recompute layout when dimensions change
  const layout = useMemo(() => {
    if (!length || !width) return null;
    return sensorLayout({
      length: parseFloat(length),
      width: parseFloat(width),
      covergae: coverage,
      overlapPct,
    });
  }, [length, width, coverage, overlapPct]);

  async function handleVerify() {
    setError(null);
    setVerifying(true);
    try {
      const res = await verifyESP32(espId);
      setVerifyStatus(res);
    } catch {
      setError("Verification failed");
    } finally {
      setVerifying(false);
    }
  }

  async function handleAddRoom() {
    if (!roomName) return setError("Room name required");
    if (!layout) return setError("Invalid dimensions");
    if (!verifyStatus?.ok) return setError("Verify ESP32 first");

    setCreating(true);
    try {
      const newRoom = {
        name: roomName,
        dimensions: { length, width, height },
        espId,
        sensors: layout.sensors,
      };

      console.log("✅ Room created (mock):", newRoom);
      await new Promise((res) => setTimeout(res, 800)); //fake api call
      alert(`Room "${roomName}" added successfully!`);
      
      handleReset();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

   function handleReset() {
    setRoomName("");
    setLength("");
    setWidth("");
    setHeight("");
    setEspId("");
    setCoverage(4);
    setOverlapPct(0.1);
    setVerifyStatus(null);
    setError(null);
  }

  return {
    roomName, setRoomName,
    length, setLength,
    width, setWidth,
    height, setHeight,
    espId, setEspId,
    layout,
    verifyStatus, verifying, creating, error,
    handleVerify, handleAddRoom, handleReset,
  };
}
