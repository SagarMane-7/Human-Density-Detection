import { useState, useMemo } from "react";
import { sensorLayout, verifyESP32 } from "./RoomSetup.logic";
import { useAuth } from "../../context/AuthContext"; 

export function useRoomSetup() {
  const { user } = useAuth();

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

  const layout = useMemo(() => {
    if (!length || !width) return null;

    return sensorLayout({
      length: Number(length),
      width: Number(width),
      coverage: coverage,
      overlapPct
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
    if (!user) return setError("User not logged in");
    if (!roomName) return setError("Room name required");
    if (!layout) return setError("Invalid dimensions");
    if (!verifyStatus?.ok) return setError("Verify ESP32 first");
    setCreating(true);
    setError(null);

    try {
      const token = await user.getIdToken();

      const newRoom = {
        name: roomName,
        dimensions: {
          length: Number(length),
          width: Number(width),
          height: Number(height)
        },
        espId,
        sensors: layout.sensors.map((s) => ({
          sensorId: s.id,
          x: s.x,
          y: s.y
        }))
      };

      const res = await fetch("http://localhost:5000/api/rooms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newRoom)
          });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create room");
      }

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
    roomName,
    setRoomName,
    length,
    setLength,
    width,
    setWidth,
    height,
    setHeight,
    espId,
    setEspId,
    layout,
    verifyStatus,
    verifying,
    creating,
    error,
    handleVerify,
    handleAddRoom,
    handleReset
  };
}
