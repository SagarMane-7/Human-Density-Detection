import React from 'react';
import styles from './Footer.module.css';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXTwitter,faLinkedin} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div>
            <div className={styles.footer}>
                <div className={styles.block}>
                    <p>Markets</p>
                    <div className={styles.list}>
                        <p><a href="https://athangrobotics.com/smart_home">Smart Home</a></p>
                        <p><a href="https://athangrobotics.com/connected_health">Connected Health</a></p>
                        <p><a href="https://athangrobotics.com/connected_autonomous_vehicles">Smart Mobility</a></p>
                    </div>
                </div>

                <div className={styles.block}>
                    <p>Services</p>
                    <div className={styles.list}>
                        <p><a href="https://athangrobotics.com/data_annotation">Data Annotation</a></p>
                        <p><a href="https://athangrobotics.com/iot_product_design_development">IoT Product Design &amp; Development</a></p>
                        <p><a href="https://athangrobotics.com/edge_ai_app_development">Edge AI Application Development</a></p>
                        <p><a href="https://athangrobotics.com/electronic_product_design">Electronic Product Design</a></p>
                    </div>
                </div>

                <div className={styles.block}>
                    <p>Company</p>
                    <div className={styles.list}>
                        <p><a href="https://athangrobotics.com/about">About Us</a></p>
                        <p><a href="https://athangrobotics.com/team">Team</a></p>
                        <p><a href="https://athangrobotics.com/locations">Locations</a></p>
                        <p><a href="https://athangrobotics.com/dataprivacy">Data Privacy</a></p>
                        <p><a href="https://athangrobotics.com/terms">Terms and Conditions</a></p>
                        <p><a href="https://athangrobotics.com/privacy">Privacy Policy</a></p>
                    </div>
                </div>

                <div className={styles.block}>
                    <p>Connect With Us</p>
                    <div className={styles.list}>
                        <p><a href="mailto:sales@athangrobotics.com">sales@athangrobotics.com</a></p>
                            <a href="https://www.linkedin.com/company/athang-robotics" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a href="https://x.com/AthangRobotics" target="_blank" rel="noopener noreferrer">
                               <FontAwesomeIcon icon={faXTwitter} />
                            </a>
                        
                    </div>
                </div>
            </div>
            <hr style={{color:'#6c757d', width:'90%'}}></hr>
            <div className={styles.rights}>
                <p>© Athang Robotics. <span>All Rights Reserved</span></p>
            </div>
        </div>
    );
};

export default Footer;
