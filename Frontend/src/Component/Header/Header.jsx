import React from 'react'
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header} style={{ height: '70px', backgroundColor: '#132d46' }}>
      <img src="/Logo.png" alt="Logo" style={{ height: '40px' }} />
    </div>

  )
}

export default Header