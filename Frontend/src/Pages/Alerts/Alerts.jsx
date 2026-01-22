import React, { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar/Navbar";
import styles from "./Alerts.module.css";
import Button from "../../Component/Button/Button";
import socket from "../../context/socket";
import { useAuth } from "../../context/AuthContext";
import Animation from "../../Component/Animation/Animation";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const { user } = useAuth();
  const [showAnimation, setShowAnimation] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
    setShowAnimation(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);       
    

  useEffect(() => {
  if (!user) return;

  let mounted = true;

  user.getIdToken(true).then(token => {
    fetch("http://localhost:5000/api/alerts", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (mounted) setAlerts(Array.isArray(data) ? data : []);
      });
  });

  const handler = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  socket.on("alert-created", handler);

  return () => {
    mounted = false;
    socket.off("alert-created", handler);
  };
}, [user]);


  async function handleAcknowledge(id) {
  if (!user) return;

  const token = await user.getIdToken();

  await fetch(`http://localhost:5000/api/alerts/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  setAlerts(prev =>
    prev.map(a =>
      a._id === id ? { ...a, acknowledged: true } : a
    )
  );
}

if (showAnimation) {
        return <Animation />;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.inner}>
        <p
          style={{
            fontSize: "25px",
            color: "#132d46",
            fontWeight: "700",
            marginLeft: "50px"
          }}
        >
          Alerts
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Alert</th>
              <th>Room</th>
              <th>Date and Time</th>
              <th>Acknowledgement</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((a) => (
              <tr key={a._id}>
                <td>{a.message}</td>
                <td>{a.roomId}</td>
                <td>
                  {new Date(a.createdAt).toLocaleDateString()}{" "}
                  {new Date(a.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>
                <td>
                  {a.acknowledged ? (
                    <span className={styles.acknowledged}>
                      Acknowledged
                    </span>
                  ) : (
                    <Button
                      style={{ width: "150px", height: "40px" }}
                      onClick={() => handleAcknowledge(a._id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </td>
              </tr>
            ))}

            {alerts.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                  No alerts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
