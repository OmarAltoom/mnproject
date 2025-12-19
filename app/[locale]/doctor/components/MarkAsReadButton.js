import React from 'react';
import styles from './MarkAsReadButton.module.css';

export default function MarkAsReadButton({ onClick }) {
  return (
    <button className={styles.markReadBtn} onClick={onClick}>
      تعليم كمقروء
    </button>
  );
}
