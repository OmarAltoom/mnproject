import React from 'react';
import styles from './AppointmentCard.module.css';

export default function AppointmentCard({ appointment, onEdit }) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div>المريض: {appointment.patient}</div>
        <div>الوقت: {appointment.time}</div>
        <div>الحالة: {appointment.status}</div>
      </div>
      <button className={styles.editBtn} onClick={onEdit}>تعديل</button>
    </div>
  );
}
