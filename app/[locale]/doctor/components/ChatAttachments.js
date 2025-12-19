import React from 'react';
import styles from './ChatAttachments.module.css';

export default function ChatAttachments({ attachments, onAttach }) {
  const handleFileChange = (e) => {
    onAttach(Array.from(e.target.files));
  };

  return (
    <div className={styles.attachments}>
      <label className={styles.uploadLabel}>
        رفع ملف أو صورة
        <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
      </label>
      <div className={styles.filesList}>
        {attachments.map((file, idx) => (
          <span key={idx} className={styles.fileItem}>{file.name || 'صورة'}</span>
        ))}
      </div>
    </div>
  );
}
