import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import Button from '../../Component/Button/Button'
import Header from '../../Component/Header/Header'
import Footer from '../../Component/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <section className={styles.login}>
        <div style={{ marginTop: "25px" }}>
          <p style={{ fontSize: "50px", width: "650px", fontWeight: "700", margin: "0px", lineHeight: "100%" }}>Human Density Detection</p>
          <p style={{ fontSize: "30px", fontWeight: "500", lineHeight: "100%", width: "600px", color: "#132D46" }}>Smart Radar-based Occupancy Monitoring System</p>
          <Link to="/authentication"><Button style={{ width: "175px", height: "55px" }}>Login / Sign-up</Button></Link>
        </div>
        <div>
          <video src="./Home/Home_Page_Animation.mp4" autoPlay loop muted playsInline style={{ width: "400px", height: "350px"}}></video>
        </div>
      </section>
      <section style={{ marginTop: "50px" }}>
        <div>
          <p style={{ fontSize: "22px", paddingLeft: "5%", fontWeight: "700", color: "#132D46" }}>Simple Setup, Powerful Insights</p>
        </div>
        <div className={styles.setup}>
          <div className={styles.image}>
            <img src="./Home/Install.png" alt="Install" style={{ width: "175px", height: "150px" }} />
            <p>Step 1: Install the Sensors</p>
          </div>
          <div className={styles.image}>
            <img src="./Home/Connect.png" alt="Connect" style={{ width: "400px", height: "175px" }} />
            <p>Step 2: Connect to the Dashboard</p>
          </div>
          <div className={styles.image}>
            <img src="./Home/Monitor.png" alt="Monitor" style={{ width: "250px", height: "150px" }} />
            <p>Step 3: Monitor in Real-Time</p>
          </div>
        </div>
      </section>
      <section style={{ marginTop: "50px" }}>
        <div>
          <p style={{ fontSize: "22px", paddingLeft: "5%", fontWeight: "700", color: "#132D46" }}>Where Can It Be Used?</p>
        </div>
        <div className={styles.uses}>
          <div className={styles.usecase}>
            <img src="./Home/Stores.jpg" alt="Install" style={{ width: "350px", height: "175px" }} />
          </div>
          <div className={styles.info}>
            <p style={{ color: "#132D46", fontWeight: "700" }}>Retail Stores:</p>
            <p>Problem: Overcrowding in certain aisles, safety concerns, long queues.<br />Solution with Radar System:</p>
            <p>• Monitors real-time foot traffic in store.</p>
            <p>• Detects overcrowded aisles and alerts staff to open more counters.</p>
            <p>• Provides analytics (peak shopping hours, customer flow paths).</p>
            <p>Advantage over Cameras: Privacy-friendly (no video/images stored).</p>
          </div>
        </div>
        <div className={styles.uses}>
          <div className={styles.usecase} >
            <img src="./Home/Office.jpg" alt="Install" style={{ width: "350px", height: "175px" }} />
          </div>
          <div className={styles.info}>
            <p style={{ color: "#132D46", fontWeight: "700" }}>Offices:</p>
            <p>Problem: Uneven usage of meeting rooms and workspaces.<br />Solution with Radar System:</p>
            <p>• Tracks how many people are in each room without invading privacy.</p>
            <p>• Helps optimize meeting room usage, seating plans, and safety compliance,Detects if a person falls or collapses in isolated office zones.</p>
            <p>• Detects if a person falls or collapses in isolated office zones.</p>
            <p>Output: Facility managers get a real-time dashboard + historical occupancy data.</p>
          </div>
        </div>
        <div className={styles.uses}>
          <div className={styles.usecase} >
            <img src="./Home/Library.jpg" alt="Install" style={{ width: "350px", height: "175px" }} />
          </div>
          <div className={styles.info}>
            <p style={{ color: "#132D46", fontWeight: "700" }}>Libraries:</p>
            <p>Problem: Quiet spaces get overcrowded, hard to manage visitor limits.<br />Solution with Radar System:</p>
            <p>• Counts people in each section (reading halls, computer labs).</p>
            <p>• Sends alerts when density exceeds the limit for comfort/safety.</p>
            <p>• Provides data to optimize seating arrangements and manage study zones.</p>
            <p>Special Note: Since it’s camera-free, ensures privacy for students and visitors. </p>
          </div>
        </div>
        <div className={styles.uses}>
          <div className={styles.usecase} >
            <img src="./Home/Many_more.png" alt="Install" style={{ width: "350px", height: "175px" }} />
          </div>
          <div className={styles.info}>
            <p style={{ color: "#132D46", fontWeight: "700" }}>And Many More…</p>
            <p>Hospitals, Airports, Classrooms, Gyms, Malls, and other indoor spaces where safety, occupancy, and privacy matter.</p>
            <p>Our system is flexible and scalable — it adapts to any environment that requires people monitoring and real-time safety alerts.</p>
          </div>
        </div>
      </section>
      <section style={{ marginTop: "50px" }}>
        <p style={{ fontSize: "22px", color: "#353f4f", fontWeight: "700", paddingLeft: "5%" }}>How it works ?</p>
        <p style={{ paddingLeft: "5%" }}>From smart sensors to real-time insights, our system delivers accurate and privacy-friendly occupancy monitoring.</p>
        <div className={styles.working}>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/Radar_Sensor.png" alt="Install" style={{ width: "150px", height: "150px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>Rd-03D Sensor </p>
            <p>Detects people & movement</p>
          </div>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/ESP32.png" alt="Install" style={{ width: "125px", height: "125px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>ESP32 Device </p>
            <p>Sends data securely via Wi-Fi</p>
          </div>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/MQTT_Broker.png" alt="Install" style={{ width: "125px", height: "100px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>MQTT Cloud</p>
            <p>Lightweight, real-time transfer</p>
          </div>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/Node.png" alt="Install" style={{ width: "150px", height: "125px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>Node.js </p>
            <p>Processes and analyzes</p>
          </div>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/Mongodb.png" alt="Install" style={{ width: "200px", height: "75px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>MongoDB</p>
            <p>Stores live & historical data</p>
          </div>
          <div className={styles.technologies}>
            <div className={styles.technology}>
              <img src="./Home/React.png" alt="Install" style={{ width: "100px", height: "90px" }} />
            </div>
            <p style={{ color: "#132D46", fontWeight: "700" }}>React.js</p>
            <p>Visualizes occupancy in real time</p>
          </div>
        </div>
      </section>
      <section className={styles.control} style={{ marginTop: "50px", marginBottom: "50px" }}>
        <p style={{ fontSize: "22px", fontWeight: "700", color: "#132D46" }}>Take Control of Your Space with Real-Time Insights</p>
        <p>Accurate, privacy-friendly occupancy monitoring powered by radar and AI — built to scale for retail, offices, libraries, and beyond.</p>
        <div className={styles.controlbtn}>
          <Button style={{ width: "175px", height: "55px" }}>Request Demo</Button>
          <a href="mailto:sales@athangrobotics.com"><Button style={{ width: "175px", height: "55px" }}>Contact Us</Button></a>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home