import React from 'react';
import styles from './AnalyticsCard.module.css';

export default function AnalyticsCard({ title, value, icon, accent }) {
  return (
    <div className={styles.card} style={{ borderColor: accent }}>
      <div className={styles.icon} style={{ color: accent }}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
