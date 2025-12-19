import React from 'react';
import ScanCard from './ScanCard';
import styles from './ScansTable.module.css';

export default function ScansTable({ scans, onView, onCompare, onAnnotate }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>رقم الفحص</th>
          <th>التاريخ</th>
          <th>النوع</th>
          <th>ملخص الذكاء الاصطناعي</th>
          <th>مقارنة</th>
          <th>إجراءات</th>
        </tr>
      </thead>
      <tbody>
        {scans.map((scan) => (
          <tr key={scan.id}>
            <td><ScanCard scan={scan} /></td>
            <td>{scan.date}</td>
            <td>{scan.type}</td>
            <td>{scan.aiSummary}</td>
            <td>{scan.comparisonAvailable ? "نعم" : "لا"}</td>
            <td>
              <button onClick={() => onView(scan)}>عرض</button>
              <button onClick={() => onCompare(scan)}>مقارنة</button>
              <button onClick={() => onAnnotate(scan)}>تعليق توضيحي</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
