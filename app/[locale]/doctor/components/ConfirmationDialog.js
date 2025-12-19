import React from 'react';
import styles from './ConfirmationDialog.module.css';

export default function ConfirmationDialog({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{message || 'هل أنت متأكد من تنفيذ هذا الإجراء؟'}</p>
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>تأكيد</button>
          <button className={styles.cancelBtn} onClick={onCancel}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}
