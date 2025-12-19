import React from 'react';
import Image from 'next/image';
import styles from './ChatList.module.css';

export default function ChatList({ chats, selectedId, onSelect }) {
  return (
    <aside className={styles.list}>
      <h3>المرضى</h3>
      <ul>
        {chats.map(chat => (
          <li
            key={chat.id}
            className={selectedId === chat.id ? styles.selected : ''}
            onClick={() => onSelect(chat.id)}
          >
            <Image
              src={chat.patient.profileImage}
              alt={chat.patient.name}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span>{chat.patient.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
