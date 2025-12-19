import React, { useState } from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import AvailabilitySettings from './AvailabilitySettings';
import NotificationSettings from './NotificationSettings';
import styles from './DoctorSettingsModal.module.css';

export default function DoctorSettingsModal({ open, onClose, doctor, onSave }) {
  const [settings, setSettings] = useState({ ...doctor });

  if (!open) return null;

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>إعدادات الدكتور</h2>
        <AvailabilitySettings value={settings.availability} onChange={v => handleChange('availability', v)} />
        <NotificationSettings value={settings.notifications} onChange={v => handleChange('notifications', v)} />
        <PasswordChangeForm onChange={v => handleChange('password', v)} />
        <div className={styles.actions}>
          <button onClick={handleSave}>حفظ</button>
          <button onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
}
