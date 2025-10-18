import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from "./Dashboard.module.css"
import Navbar from '../../Component/Navbar/Navbar'
import Human_Icon from '../../Component/Human_Icon/Human_Icon';



const Dashboard = ({ onselectroom }) => {
  
  const [rooms, setRooms] = useState([]);
   useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  const blocks = 6;
  const displayrooms = [...rooms];

  while (displayrooms.length < blocks) {
    displayrooms.push({ id: `${displayrooms.length}`, name: "Unassigned", isActive: false })
  }

  return (
    <div>
      <Navbar />
      <section>
        <div className={styles.roominfo}>
          {displayrooms.map((room) => {
            let roomblock;
            if (room.isActive) {
              roomblock = (
                <div key={room.id} className={styles.roomview}>
                  <Link to={`/dashboard/${room.id}`}>
                  <div style={{ width: "425px", height: "225px",position: "relative",border:"2px solid #00CC99"}}  onClick={()=> onselectroom(room.id)}>
                    {room.people?.map(people => (
                      <Human_Icon
                        key={people.id}
                        style={{
                          position: "absolute",
                          left: `${people.x}%`,
                          top: `${people.y}%`
                        }}
                      />
                    ))}
                  </div>
                  </Link>
                  <div><p>{room.name}:{room.count}</p></div>
                </div>
              );
            }
            else {
              roomblock = (
                <div key={room.id} className={styles.roomview} >
                  <div className={styles.offline} style={{ width: "425px", height: "225px",border:"2px solid #00CC99", backgroundColor:"#132D46" }}><img src="./Logo.png" style={{width:"175px", height:"40px"}}/></div>
                  <div><p>{room.name}</p></div>
                </div>
              );
            }

            return roomblock;

          })}
        </div>
      </section>
    </div>
  )
}

export default Dashboard