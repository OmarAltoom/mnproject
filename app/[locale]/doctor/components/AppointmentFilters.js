import React from 'react';
import styles from './AppointmentFilters.module.css';

export default function AppointmentFilters({ filters, onChange }) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="اسم المريض"
        value={filters.patient || ''}
        onChange={e => onChange({ ...filters, patient: e.target.value })}
      />
      <select
        value={filters.status || ''}
        onChange={e => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">كل الحالات</option>
        <option value="مجدول">مجدول</option>
        <option value="مؤكد">مؤكد</option>
        <option value="ملغي">ملغي</option>
      </select>
    </div>
  );
}
