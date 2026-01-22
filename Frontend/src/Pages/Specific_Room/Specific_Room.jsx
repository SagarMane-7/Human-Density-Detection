import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Specific_Room.module.css"
import Navbar from "../../Component/Navbar/Navbar";
import Human_Icon from '../../Component/Human_Icon/Human_Icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from "../../context/AuthContext";
import socket from "../../context/socket";
import Animation from "../../Component/Animation/Animation";


function sampleData(data, maxPoints = 30) {
  if (!data || data.length <= maxPoints) return data;

  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, index) => index % step === 0);
}


const Specific_Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const { user } = useAuth();
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
    
      return () => clearTimeout(timer);
    }, []);
    

    useEffect(() => {
    if (!user) return;

  user.getIdToken(true).then(token => {
    fetch(`http://localhost:5000/api/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setRoom(data);
        socket.emit("join-room", id);
      });
  });

  socket.on("room-update", payload => {
    if (payload.roomId === id) {
      setRoom(prev => prev ? { ...prev, ...payload } : prev);
    }
  });

  return () => socket.off("room-update");
}, [id, user]);

    if (showAnimation) {
      return <Animation />;
    }

    if (!room) {
        return <div>Room Not Found </div>;
    }
    
    return (
        <div>
            <Navbar />
            <div className={styles.specificdashboard}>
                <section className={styles.view} style={{ width: "1250px", height: "525px", position: "relative", border: "3px solid #132D46" }}>
                    <p style={{fontSize: "22px",color: "#00CC99", paddingLeft:"10px" }}>{room.name}</p>
                    {room.people?.map(people => (
                        <Human_Icon key={people.id} style={{ position: "absolute", left: `${people.x}%`, top: `${100 - people.y}%`}} />
                    ))}
                </section>
                <div className={styles.count_chart} >
                    <section style={{ width: '400px', height: '350px', fontSize: "22px" }}>
                        <p>Total Count : {room.count}</p>
                        <p>No. Of Sensors : {room.sensorDetails?.length || 0} </p>
                        <p>
                            {(() => {
                                let alert;
                                if (!room.alerts || room.alerts === "" || room.alerts === "No Alerts" || room.alerts === "No Alerts at the Moment") {
                                    alert = <p style={{ color: "#00CC99" }}>No Alerts at the Moment</p>;
                                } else {
                                    alert = (
                                        <button className={styles.blink} style={{color: "#ffffff",width: "120px",height: "40px",backgroundColor: "#ff0000",borderRadius: "8px",border: "none",cursor: "pointer",fontWeight:"600",fontSize:"20px"}}
                                        onClick={() => {navigate("/alerts");}}
                                        >
                                        Alert !
                                        </button>
                                        );
                                }
                                return alert;

                            })()}
                        </p>
                    </section>
                    <section style={{ width: '700px', height: '350px' }}>
                        {room.occupancyTrend && room.occupancyTrend.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                               <LineChart data={sampleData(room.occupancyTrend, 25)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="timestamp"
                                        tickFormatter={(t) =>
                                        new Date(t).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                        }
                                    />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip
                                        labelFormatter={(t) =>
                                        new Date(t).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="occupancy"
                                        stroke="#00CC99"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            ) : (
                            <p style={{ color: "#888", textAlign: "center", paddingTop: "120px" }}>
                                No occupancy history yet
                            </p>
                            )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Specific_Room