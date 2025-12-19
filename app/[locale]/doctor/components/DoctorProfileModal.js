"use client";
import React, { useState } from 'react';
import styles from './DoctorProfileModal.module.css';

export default function DoctorProfileModal({ doctor, open, onClose, onSave }) {
  const [form, setForm] = useState({ ...doctor });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>تعديل معلومات الدكتور</h2>
        <form onSubmit={handleSubmit}>
          <label>
            الاسم:
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            التخصص:
            <input name="specialization" value={form.specialization} onChange={handleChange} required />
          </label>
          <label>
            البريد الإلكتروني:
            <input name="email" value={form.email} onChange={handleChange} type="email" required />
          </label>
          <label>
            رقم الهاتف:
            <input name="phone" value={form.phone} onChange={handleChange} type="tel" required />
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
