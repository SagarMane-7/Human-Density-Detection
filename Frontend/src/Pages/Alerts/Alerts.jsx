import React, {useState} from "react";
import Navbar from '../../Component/Navbar/Navbar'
import styles from "./Alerts.module.css"
import Button from '../../Component/Button/Button'

export default function Alerts() {
    const [alerts , setAlerts] = useState([
        { id: 1, alert: "Sensor 1 is inactive", room: "Kitchen", date: "03/09/2025", time: "11:59 PM", acknowledged: false },
        { id: 2, alert: "Sensor 3 is inactive", room: "Hall", date: "03/09/2025", time: "11:59 PM", acknowledged: false },
        { id: 3, alert: "Density threshold crossed", room: "Bedroom", date: "03/09/2025", time: "11:59 PM", acknowledged: true },
        { id: 4, alert: "Sensor 2 is inactive", room: "Bedroom", date: "03/09/2025", time: "11:59 PM", acknowledged: false },
    ])

    function handleAcknowledge(id) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledged: true } : a
            )
        );
    }
    
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.inner}>
                <p style={{ fontSize: "25px", color: "#132d46", fontWeight: "700", marginLeft: "50px" }}>Alerts</p>
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
                            <tr key={a.id}>
                                <td>{a.alert}</td>
                                <td>{a.room}</td>
                                <td>{a.date} {a.time}</td>
                                <td>
                                {a.acknowledged ? (
                                    <span className={styles.acknowledged}>Acknowledged</span>
                                ) : (
                                    <Button
                                    style={{width: "150px" ,height: "40px"}}
                                    onClick={() => handleAcknowledge(a.id)}
                                    >
                                    Acknowledge
                                    </Button>
                                )}
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
