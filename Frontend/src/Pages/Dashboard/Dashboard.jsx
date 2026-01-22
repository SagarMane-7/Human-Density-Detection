import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "../../Component/Navbar/Navbar";
import Human_Icon from "../../Component/Human_Icon/Human_Icon";
import { useAuth } from "../../context/AuthContext";
import socket from "../../context/socket";
import Animation from "../../Component/Animation/Animation";

const Dashboard = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!user) return;

    let mounted = true;

    user.getIdToken(true).then(token => {
      fetch("http://localhost:5000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then(data => {
          if (mounted) setRooms(Array.isArray(data) ? data : []);
        })
        .catch(() => {
          if (mounted) setRooms([]);
        })
        .finally(() => setLoading(false));
    });

    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    const handler = payload => {
      setRooms(prev =>
        prev.map(room =>
          room.id === payload.roomId
            ? { ...room, count: payload.count, people: payload.people }
            : room
        )
      );
    };

    socket.on("room-update", handler);
    return () => socket.off("room-update", handler);
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowAnimation(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);

if (showAnimation) {
  return <Animation />;
}

  const blocks = 6;
  const displayrooms = [...rooms];

  while (displayrooms.length < blocks) {
    displayrooms.push({
      id: `placeholder-${displayrooms.length}`,
      name: "Unassigned",
      isActive: false
    });
  }

  return (
    <div>
      <Navbar />
      <section>
        <div className={styles.roominfo}>
          {displayrooms.map(room => (
            room.isActive ? (
              <div key={room.id} className={styles.roomview}>
                <Link to={`/dashboard/${room.id}`}>
                  <div
                    style={{
                      width: "425px",
                      height: "225px",
                      position: "relative",
                      border: "2px solid #00CC99"
                    }}
                  >
                    {room.people?.map(person => (
                      <Human_Icon
                        key={person.id}
                        style={{
                          position: "absolute",
                          left: `${person.x}%`,
                          top: `${100 - person.y}%`
                        }}
                      />
                    ))}
                  </div>
                </Link>
                <p>{room.name}: {room.count}</p>
              </div>
            ) : (
              <div key={room.id} className={styles.roomview}>
                <div
                  className={styles.offline}
                  style={{
                    width: "425px",
                    height: "225px",
                    border: "2px solid #00CC99",
                    backgroundColor: "#132D46"
                  }}
                >
                  <img src="/Logo.png" alt="logo" style={{ width: 175 }} />
                </div>
                <p>{room.name}</p>
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
