import React, { useState } from 'react';
import styles from './PasswordChangeForm.module.css';

export default function PasswordChangeForm({ onChange }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword) {
      onChange(newPassword);
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>تغيير كلمة المرور</h3>
      <input
        type="password"
        placeholder="كلمة المرور الحالية"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="كلمة المرور الجديدة"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">تغيير</button>
    </form>
  );
}
