import React from 'react'
import styles from "./Button.module.css"

function Button({ children, onClick, type = "button",style }) {
  return (
    <button className={styles.btn} onClick={onClick} type={type} style={style}>
      {children}
    </button>
  );
}

export default Button