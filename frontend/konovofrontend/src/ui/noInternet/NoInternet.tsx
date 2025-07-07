import React from 'react'
import styles from './NoInternet.module.css'

export const NoInternet = () => {
  return (
    <div className={styles.noInternetWrapper}>
      <h2 className={styles.heading}>📡 Nema internet konekcije.</h2>
      <p className={styles.description}>Proverite vašu internet konekciju i pokušajte ponovo.</p>
    </div>
  )
}
