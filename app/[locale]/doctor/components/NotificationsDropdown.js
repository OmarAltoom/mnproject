import React from 'react';
import NotificationItem from './NotificationItem';
import styles from './NotificationsDropdown.module.css';

export default function NotificationsDropdown({ notifications = [], onMarkAsRead }) {
  return (
    <div className={styles.dropdown}>
      <h3>الإشعارات</h3>
      <ul>
        {notifications.length === 0 ? (
          <li className={styles.empty}>لا توجد إشعارات جديدة</li>
        ) : (
          notifications.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} onMarkAsRead={onMarkAsRead} />
          ))
        )}
      </ul>
    </div>
  );
}
