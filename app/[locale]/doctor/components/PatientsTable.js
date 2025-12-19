import React from 'react';
import PatientCard from './PatientCard';
import styles from './PatientsTable.module.css';

export default function PatientsTable({ patients, onView, onChat }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>الاسم</th>
          <th>آخر فحص</th>
          <th>الحالة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td><PatientCard patient={patient} /></td>
            <td>{patient.lastScanDate}</td>
            <td>{patient.status}</td>
            <td>
              <button className={styles.actionButton} onClick={() => onView(patient)}>عرض</button>
              <button className={styles.actionButton} onClick={() => onChat(patient)}>محادثة</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
