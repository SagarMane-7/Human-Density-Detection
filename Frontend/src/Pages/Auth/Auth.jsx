import React, { useState, useEffect } from "react";
import LoginForm from "../../component/LoginForm/LoginForm";
import SignupForm from "../../component/SignupForm/SignupForm";
import Header from '../../Component/Header/Header'
import styles from "./Auth.module.css";

export default function Auth() {
  const [mode, setMode] = useState("login");
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.left}>
            <h1 className={styles.heading}>
              Human Density <br /> Detection
            </h1>
            <p className={styles.subheading}>
              Smart Radar-based Occupancy Monitoring System
            </p>
            <video src="./Home/Home_Page_Animation.mp4" autoPlay loop muted playsInline  className={styles.image}></video>
          </div>

          <div className={styles.right}>
            {mode === "login" ? (
              <LoginForm setMode={setMode} />
            ) : (
              <SignupForm setMode={setMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
