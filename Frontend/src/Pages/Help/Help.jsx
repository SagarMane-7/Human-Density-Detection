import React, { useState } from 'react';
import styles from "./Help.module.css"
import Navbar from '../../Component/Navbar/Navbar'

const Help = () => {
    const [openQuestion, setOpenQuestion] = useState(null);
    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const faqs = [
        {
            question: "Q1: How do I add a new room?",
            answer: "Go to the dashboard → click Add Room → enter Room Name and Dimensions. The system will generate a blueprint automatically."
        },
        {
            question: "Q2: How do I install sensors?",
            answer: "Check the generated blueprint → mount sensors at suggested coordinates → ensure power supply and alignment."
        },
        {
            question: "Q3: My ESP32 is not verifying, what should I do?",
            answer: "Check WiFi connection, power supply, and make sure the ESP32 ID is entered correctly. Restart the device if needed."
        },
        {
            question: "Q4: How does the system handle multiple sensors?",
            answer: "The system automatically filters out noise, removes duplicate detections, and merges data from all connected sensors into a single, clean dataset for your 2D floor plan."
        },
        {
            question: "Q5: What kind of data can I see on the dashboard?",
            answer: "The dashboard displays live occupancy counts, individual sensor status, real-time person plotting on a 2D floor plan, and alerts when density thresholds are exceeded."
        },
        {
            question: "Q6: Can I review past movement patterns?",
            answer: "Yes. All processed information is stored in MongoDB Atlas, allowing you to access and playback historical movement patterns and analytical data for any given period."
        },
        {
            question: "Q7: How accurate is the fall detection?",
            answer: "Our radar-based system uses RD-03D_V2 sensors to detect subtle movements and abnormal patterns, providing reliable fall detection with instant, discreet alerts."
        },
        {
            question: "Q8: Is the system privacy-compliant?",
            answer: "Absolutely. Our radar sensors detect anonymous (x,y) coordinates of objects, not identifiable images. This ensures 100% privacy compliance as no personal data is collected."
        },
        {
            question: "Q9: What happens if my Wi-Fi disconnects?",
            answer: "The system features automatic MQTT reconnection. If your Wi-Fi temporarily drops, the ESP32 will automatically re-establish the connection to the MQTT broker to ensure continuous data flow."
        }
    ];
    return (
        <div>
            <Navbar />
            <p style={{ fontSize: "25px", color: "#132d46", fontWeight: "700", marginLeft: "50px" }}>Help Center</p>
            <section>
                <p style={{ fontSize: "22px", color: "#132d46", fontWeight: "700", marginLeft: "50px" }}>Installation Guide</p>
                <div className={styles.guide}>
                    <div style={{ width: "375px" }}>
                        <img src="/Help/Register.png" alt="Room Setup" style={{ width: "250px", height: "200px" }} />
                        <p style={{ color: "#132d46", fontWeight: "700" }}>Step 1: Add Room Setup</p>
                        <p>Enter the Room Name and Dimensions (L × W × H) in the dashboard.<br />A Blueprint with sensors and coordinates will be generated automatically.</p>
                    </div>
                    <div style={{ width: "375px" }}>
                        <img src="/Help/Install.png" alt="Sensor Installation" style={{ width: "215px", height: "200px" }} />
                        <p style={{ color: "#132d46", fontWeight: "700" }}>Step 2: Install Sensor</p>
                        <p> Mount the sensors at the suggested coordinates as per the blueprint.<br />
                            Ensure all sensors are powered and properly aligned.</p>
                    </div>
                    <div style={{ width: "375px" }}>
                        <img src="/Help/Room_Setup.png" alt="ESP32 Verification" style={{ width: "250px", height: "200px" }} />
                        <p style={{ color: "#132d46", fontWeight: "700" }}>Step 3: Verify ESP32 Sensor</p>
                        <p>Enter the ESP32 ID in the dashboard and click Verify.<br />Once the connection is successful, select Add Room to completesetup.</p>
                    </div>
                </div>
            </section>
            <section className={styles.demo} >
                <p style={{ fontSize: "22px", color: "#132d46", fontWeight: "700", textAlign: "center" }}>Installation Demo</p>
                <iframe width="1200" height="600" src="https://www.youtube.com/embed/iwD9RiqIHQw?autoplay=1&mute=1&loop=1&playlist=iwD9RiqIHQw" title="YouTube video" frameBorder="0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
            </section>
            <section className={styles.faq} style={{ marginLeft: "50px" }}>
                <p style={{ fontSize: "22px", color: "#132d46", fontWeight: "700" }}>Frequently Asked Questions</p>
                <div>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{ marginBottom: '15px', paddingBottom: '10px' }}>
                            <p
                                style={{ color: "#132d46", fontWeight: "700", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",width:"500px" }}
                                onClick={() => toggleQuestion(index)}
                            >
                                {faq.question}
                                <span style={{ fontSize: '18px' }}>{openQuestion === index ? '-' : '+'}</span>
                            </p>
                            {openQuestion === index && (
                                <p style={{ marginTop: '10px', color: '#6c757d' }}>{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Help
