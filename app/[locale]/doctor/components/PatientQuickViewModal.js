import Image from "next/image";
import React from 'react';
import styles from './PatientQuickViewModal.module.css';

export default function PatientQuickViewModal({ patient, open, onClose }) {
  if (!open || !patient) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>تفاصيل المريض</h2>
        <Image
          src={patient.profileImage}
          alt={patient.name}
          width={64}
          height={64}
          className={styles.avatar}
          sizes="64px"
        />
        <div>الاسم: {patient.name}</div>
        <div>العمر: {patient.age}</div>
        <div>الحالة: {patient.status}</div>
        <div>آخر فحص: {patient.lastScanDate}</div>
        <div>تاريخ طبي مختصر: {patient.medicalHistory}</div>
        <button onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
}
