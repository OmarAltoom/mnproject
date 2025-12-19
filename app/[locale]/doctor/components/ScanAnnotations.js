import React from 'react';
import styles from './ScanAnnotations.module.css';

export default function ScanAnnotations({ annotations }) {
  if (!annotations || annotations.length === 0) return null;
  return (
    <div className={styles.annotations}>
      <h3>التعليقات التوضيحية</h3>
      <ul>
        {annotations.map((ann, idx) => (
          <li key={idx}>{ann.text} <span className={styles.position}>({ann.position})</span></li>
        ))}
      </ul>
    </div>
  );
}
