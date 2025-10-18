import React from 'react'
import styles from './Human_Icon.module.css'

const Human_Icon = ({ style }) => {
    return (
        <img
            className={styles.icon}
            height="30px"
            width="30px"
            src='/Human.png'
            style={style}
        />
    )
}

export default Human_Icon
