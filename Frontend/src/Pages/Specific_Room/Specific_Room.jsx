import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Specific_Room.module.css"
import Navbar from "../../Component/Navbar/Navbar";
import Human_Icon from '../../Component/Human_Icon/Human_Icon';
import Button from '../../Component/Button/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Specific_Room = () => {

    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/rooms/${id}`)
            .then(res => res.json())
            .then(data => setRoom(data))
            .catch(err => console.error("Error fetching festival:", err));
    }, [id]);

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
                        <Human_Icon key={people.id} style={{ position: "absolute", left: `${people.x}%`, top: `${people.y}%` }} />
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
                                    alert = <p style={{ color: "#ffffff", width:"100px",height:"40px", backgroundColor:"#ff0000",textAlign:"center" ,borderRadius:"8px"}}>Alert !</p>;
                                }

                                return alert;

                            })()}
                        </p>
                    </section>
                    <section style={{ width: '700px', height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={room.occupancyTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="linear" dataKey="Occupancy" stroke="#00CC99" />
                            </LineChart>
                        </ResponsiveContainer>
                    </section>
                </div>
                <section className={styles.specificdashboard}>
                    <p>Sensor Information</p>
                    <table style={{ width: "540px" }}>
                        <thead style={{ backgroundColor: "#00CC99", height: "45px", color: "#ffffff", textAlign: "center" }}>
                            <tr>
                                <th style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>Name</th>
                                <th style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>Status</th>
                                <th style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>Reset</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>
                            {room.sensorDetails?.map(sensor => (
                                <tr key={sensor.name}>
                                    <td style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>{sensor.name || test}</td>
                                    <td style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>{sensor.status || test}</td>
                                    <td style={{ height: "45px", textAlign: "center", border: "1px solid #132D46" }}>
                                        <Button style={{ width: "75px", height: "30px" }}>Reset</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}

export default Specific_Room