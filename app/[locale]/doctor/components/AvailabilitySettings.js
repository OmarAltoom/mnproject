import React from 'react';
import styles from './AvailabilitySettings.module.css';

export default function AvailabilitySettings({ value, onChange }) {
  return (
    <div className={styles.availability}>
      <h3>ساعات العمل والتوافر</h3>
      <label>
        أيام العمل:
        <input
          type="text"
          value={value.days || ''}
          onChange={e => onChange({ ...value, days: e.target.value })}
          placeholder="مثال: الأحد - الخميس"
        />
      </label>
      <label>
        وقت البداية:
        <input
          type="time"
          value={value.start || ''}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
      </label>
      <label>
        وقت النهاية:
        <input
          type="time"
          value={value.end || ''}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </label>
    </div>
  );
}
