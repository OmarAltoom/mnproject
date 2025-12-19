import React from 'react';
import styles from './PatientSearchBar.module.css';

export default function PatientSearchBar({ value, onChange }) {
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="بحث سريع عن مريض..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
