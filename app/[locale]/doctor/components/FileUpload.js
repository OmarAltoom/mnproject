import React from 'react';
import styles from './FileUpload.module.css';

export default function FileUpload({ onUpload, accept = '*' }) {
  const handleChange = (e) => {
    if (e.target.files.length) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className={styles.upload}>
      <label className={styles.label}>
        رفع ملف أو فحص
        <input type="file" accept={accept} multiple onChange={handleChange} style={{ display: 'none' }} />
      </label>
    </div>
  );
}
