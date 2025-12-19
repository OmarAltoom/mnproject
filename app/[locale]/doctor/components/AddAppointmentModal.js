import React, { useState } from 'react';
import styles from './AddAppointmentModal.module.css';

export default function AddAppointmentModal({ open, appointment, onClose, onSave }) {
  const [form, setForm] = useState(appointment || { patient: '', date: '', time: '', status: 'مجدول' });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{appointment ? 'تعديل موعد' : 'إضافة موعد جديد'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            اسم المريض:
            <input name="patient" value={form.patient} onChange={handleChange} required />
          </label>
          <label>
            التاريخ:
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            الوقت:
            <input name="time" type="time" value={form.time} onChange={handleChange} required />
          </label>
          <label>
            الحالة:
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="مجدول">مجدول</option>
              <option value="مؤكد">مؤكد</option>
              <option value="ملغي">ملغي</option>
            </select>
          </label>
          <div className={styles.actions}>
            <button type="submit">حفظ</button>
            <button type="button" onClick={onClose}>إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
