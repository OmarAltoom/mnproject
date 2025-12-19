import React from 'react';
import styles from './PatientFilters.module.css';

export default function PatientFilters({ filters, onChange }) {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="اسم المريض"
        value={filters.name || ''}
        onChange={e => onChange({ ...filters, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="العمر"
        value={filters.age || ''}
        onChange={e => onChange({ ...filters, age: e.target.value })}
      />
      <select
        value={filters.status || ''}
        onChange={e => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">كل الحالات</option>
        <option value="مستقر">مستقر</option>
        <option value="حرج">حرج</option>
        <option value="بانتظار الفحص">بانتظار الفحص</option>
      </select>
    </div>
  );
}
