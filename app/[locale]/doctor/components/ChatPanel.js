"use client";
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatAttachments from './ChatAttachments';
import styles from './ChatPanel.module.css';

const mockChats = [
  {
    id: 1,
    patient: { name: "محمد علي", profileImage: "/default-patient.png" },
    messages: [
      { id: 1, sender: "doctor", text: "مرحباً محمد، كيف تشعر اليوم؟", time: "10:00" },
      { id: 2, sender: "patient", text: "أشعر بتحسن، شكراً دكتور.", time: "10:01" }
    ]
  },
  {
    id: 2,
    patient: { name: "سارة يوسف", profileImage: "/default-patient.png" },
    messages: [
      { id: 1, sender: "doctor", text: "سارة، هل لديك أي أعراض جديدة؟", time: "09:30" }
    ]
  }
];

export default function ChatPanel() {
  const [selectedChatId, setSelectedChatId] = useState(mockChats[0].id);
  const [attachments, setAttachments] = useState([]);

  const selectedChat = mockChats.find(c => c.id === selectedChatId);

  const handleSend = (msg) => {
    // إضافة الرسالة إلى المحادثة (محاكاة)
    selectedChat.messages.push({
      id: selectedChat.messages.length + 1,
      sender: "doctor",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const handleAttach = (files) => {
    setAttachments([...attachments, ...files]);
  };

  return (
    <div className={styles.panel}>
      <ChatList chats={mockChats} selectedId={selectedChatId} onSelect={setSelectedChatId} />
      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {selectedChat.messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} patient={selectedChat.patient} />
          ))}
        </div>
        <ChatAttachments attachments={attachments} onAttach={handleAttach} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
