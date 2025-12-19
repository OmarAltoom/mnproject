'use client';

import React from 'react';
import { FaHome, FaUserInjured, FaXRay, FaComments, FaCalendarAlt, FaChartBar, FaBell, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DoctorSidebar.module.css';

export default function DoctorSidebar({ active }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/en') ? 'en' : 'ar';
  const basePrefix = locale === 'en' ? '/en' : '/ar';

  const navItems = [
    { label: 'الصفحة الرئيسية', icon: <FaHome />, href: `${basePrefix}/doctor/dashboard` },
    { label: 'المرضى', icon: <FaUserInjured />, href: `${basePrefix}/doctor/patients` },
    { label: 'الصور الطبية', icon: <FaXRay />, href: `${basePrefix}/doctor/results` },
    { label: 'المحادثات', icon: <FaComments />, href: `${basePrefix}/doctor/chat` },
    { label: 'المواعيد', icon: <FaCalendarAlt />, href: `${basePrefix}/doctor/appointments` },
    { label: 'التحليلات', icon: <FaChartBar />, href: `${basePrefix}/doctor/analytics` },
    { label: 'الإشعارات', icon: <FaBell />, href: `${basePrefix}/doctor/notifications` },
    { label: 'الإعدادات', icon: <FaCog />, href: `${basePrefix}/doctor/settings` },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className={active === item.href ? styles.active : ''}>
              <Link href={item.href}>
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
