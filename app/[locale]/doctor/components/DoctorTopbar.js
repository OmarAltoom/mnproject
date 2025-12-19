"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import NotificationsDropdown from './NotificationsDropdown';
import styles from './DoctorTopbar.module.css';

const mockNotifications = [
  { id: 1, type: 'رسالة جديدة', text: 'وصلتك رسالة من المريض محمد علي', time: '10:05', urgent: false, read: false },
  { id: 2, type: 'فحص جديد', text: 'تم رفع فحص جديد لسارة يوسف', time: '09:50', urgent: true, read: false },
  { id: 3, type: 'تنبيه عاجل', text: 'حالة حرجة تم اكتشافها بواسطة الذكاء الاصطناعي', time: '09:30', urgent: true, read: false }
];

export default function DoctorTopbar({ doctorName, profileImage, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.profileSection}>
        <Image
          src={profileImage}
          alt="صورة الدكتور"
          width={48}
          height={48}
          className={styles.profileImage}
          sizes="48px"
        />
        <span className={styles.doctorName}>{doctorName}</span>
      </div>
      <div className={styles.actions}>
        <div style={{ position: 'relative' }}>
          <button
            className={styles.iconBtn}
            title="الإشعارات"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaBell />
            <span className={styles.badge}>{notifications.filter(n => !n.read).length}</span>
          </button>
          {dropdownOpen && (
            <NotificationsDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
            />
          )}
        </div>
        <button className={styles.iconBtn} title="الإعدادات">
          <FaCog />
        </button>
        <button className={styles.iconBtn} title="تسجيل خروج" onClick={onLogout}>
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
}
