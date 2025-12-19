import React from 'react';
import styles from './NotificationSettings.module.css';

export default function NotificationSettings({ value, onChange }) {
  return (
    <div className={styles.notifications}>
      <h3>إعدادات الإشعارات</h3>
      <label>
        <input
          type="checkbox"
          checked={value.email || false}
          onChange={e => onChange({ ...value, email: e.target.checked })}
        />
        إشعارات البريد الإلكتروني
      </label>
      <label>
        <input
          type="checkbox"
          checked={value.sms || false}
          onChange={e => onChange({ ...value, sms: e.target.checked })}
        />
        إشعارات الرسائل النصية
      </label>
      <label>
        <input
          type="checkbox"
          checked={value.inApp || false}
          onChange={e => onChange({ ...value, inApp: e.target.checked })}
        />
        إشعارات داخل التطبيق
      </label>
    </div>
  );
}
