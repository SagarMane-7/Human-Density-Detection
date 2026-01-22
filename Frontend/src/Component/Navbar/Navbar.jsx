import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css'
import Logout from "../Logout/Logout";

const Navbar = () => {
     const location = useLocation();
    return (
        <div className={styles.navbar} style={{ height: '70px', backgroundColor: '#132d46' }}>
            <div>
                <img src="/Logo.png" alt="Logo" style={{ height: '40px' }} />
            </div>
            <div className={styles.navigation} style={{ color: '#ffffff', fontWeight:"500"}}>
                <Link to="/dashboard" style={{ textDecoration: 'none',  color: location.pathname === '/dashboard'  ? '#00CC99' : '#ffffff'}}>Dashboard</Link>
                <Link to="/roomsetup" style={{ textDecoration: 'none', color: location.pathname === '/roomsetup' ? '#00CC99' : '#ffffff' }}>RoomSetup</Link>
                <Link to="/alerts" style={{ textDecoration: 'none', color: location.pathname === '/alerts' ? '#00CC99' : '#ffffff' }}>Alerts</Link>
                <Link to="/help" style={{ textDecoration: 'none', color: location.pathname === '/help' ? '#00CC99' : '#ffffff' }}>Help</Link>
                <div><Logout/></div>
            </div>
        </div>
    )
}

export default Navbar