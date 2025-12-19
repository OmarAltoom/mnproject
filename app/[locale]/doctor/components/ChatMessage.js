import React from 'react';
import Image from 'next/image';
import styles from './ChatMessage.module.css';

export default function ChatMessage({ message, patient }) {
  const isDoctor = message.sender === 'doctor';
  return (
    <div className={isDoctor ? styles.doctorMsg : styles.patientMsg}>
      {!isDoctor && (
        <Image
          src={patient.profileImage}
          alt={patient.name}
          width={36}
          height={36}
          className={styles.avatar}
        />
      )}
      <span className={styles.text}>{message.text}</span>
      <span className={styles.time}>{message.time}</span>
    </div>
  );
}
