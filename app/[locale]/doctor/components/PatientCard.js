import React from 'react';
import Image from 'next/image';
import styles from './PatientCard.module.css';

export default function PatientCard({ patient }) {
  return (
    <div className={styles.card}>
      <Image
        src={patient.profileImage}
        alt={patient.name}
        width={64}
        height={64}
        className={styles.profileImage}
      />
      <div>
        <div className={styles.name}>{patient.name}</div>
        <div className={styles.age}>العمر: {patient.age}</div>
      </div>
    </div>
  );
}
