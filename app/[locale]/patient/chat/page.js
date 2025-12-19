"use client";

import { useState } from "react";
import { useToast } from "@/app/components/ui/Toast";
import { FaSearch, FaUserMd, FaPaperPlane, FaPhone, FaVideo, FaPaperclip, FaEllipsisV, FaCircle, FaCheck, FaCheckDouble } from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function PatientChatPage() {
  const { locale } = useLocale();
  const { showToast, ToastContainer } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const labels = locale === "en" ? {
    // Page title
    pageTitle: "Conversations",
    
    // Search
    searchPlaceholder: "Search for doctor...",
    
    // Chat list
    online: "Online now",
    offline: "Offline",
    unreadBadge: "unread",
    
    // Status indicators
    typing: "typing...",
    sent: "Sent",
    delivered: "Delivered",
    read: "Read",
    
    // Message input
    messagePlaceholder: "Type your message...",
    sendButton: "Send",
    attachButton: "Attach file",
    pressEnter: "Press Enter to send",
    
    // Action buttons
    voiceCall: "Voice call",
    videoCall: "Video call",
    moreOptions: "More options",
    
    // Empty state
    emptyStateTitle: "Select a conversation to start",
    emptyStateDescription: "Choose a doctor from the list to start chatting",
    
    // Toast messages
    toast: {
      messageSent: "Message sent",
      voiceCallSoon: "Voice call coming soon",
      videoCallSoon: "Video call coming soon",
      attachFileSoon: "Attach file coming soon"
    },
    
    // Time labels
    now: "Now",
    yesterday: "Yesterday",
    today: "Today"
  } : {
    // Page title
    pageTitle: "المحادثات",
    
    // Search
    searchPlaceholder: "بحث عن طبيب...",
    
    // Chat list
    online: "متصل الآن",
    offline: "غير متصل",
    unreadBadge: "غير مقروءة",
    
    // Status indicators
    typing: "يكتب...",
    sent: "تم الإرسال",
    delivered: "تم التوصيل",
    read: "تم القراءة",
    
    // Message input
    messagePlaceholder: "اكتب رسالتك...",
    sendButton: "إرسال",
    attachButton: "إرفاق ملف",
    pressEnter: "اضغط Enter للإرسال",
    
    // Action buttons
    voiceCall: "مكالمة صوتية",
    videoCall: "مكالمة فيديو",
    moreOptions: "خيارات إضافية",
    
    // Empty state
    emptyStateTitle: "اختر محادثة للبدء",
    emptyStateDescription: "حدد طبيباً من القائمة لبدء المحادثة",
    
    // Toast messages
    toast: {
      messageSent: "تم إرسال الرسالة",
      voiceCallSoon: "مكالمة صوتية قريباً",
      videoCallSoon: "مكالمة فيديو قريباً",
      attachFileSoon: "إرفاق ملف قريباً"
    },
    
    // Time labels
    now: "الآن",
    yesterday: "أمس",
    today: "اليوم"
  };

  const [conversations, setConversations] = useState(
    locale === "en" ? [
      {
        id: 1,
        doctorName: "Dr. Sarah Ahmed",
        specialty: "Radiology Specialist",
        avatar: "👩‍⚕️",
        lastMessage: "I'll review the X-ray results and get back to you soon",
        lastMessageTime: "10:30 AM",
        unreadCount: 2,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "Good morning Doctor, when will the X-ray results be ready?", time: "10:15 AM", status: "read" },
          { id: 2, sender: "doctor", text: "Good morning, the results will be ready today", time: "10:20 AM" },
          { id: 3, sender: "patient", text: "Thank you very much, is there anything I should watch out for?", time: "10:25 AM", status: "read" },
          { id: 4, sender: "doctor", text: "I'll review the X-ray results and get back to you soon", time: "10:30 AM" }
        ]
      },
      {
        id: 2,
        doctorName: "Dr. Mohamed Ali",
        specialty: "Orthopedic Surgeon",
        avatar: "👨‍⚕️",
        lastMessage: "You can book an appointment for Thursday",
        lastMessageTime: "Yesterday",
        unreadCount: 0,
        isOnline: false,
        messages: [
          { id: 1, sender: "patient", text: "Hello Doctor, I'm feeling pain in my knee", time: "Yesterday 3:00 PM", status: "read" },
          { id: 2, sender: "doctor", text: "Hello, is the pain constant or does it come and go?", time: "Yesterday 3:15 PM" },
          { id: 3, sender: "patient", text: "It increases when climbing stairs", time: "Yesterday 3:20 PM", status: "read" },
          { id: 4, sender: "doctor", text: "You can book an appointment for Thursday", time: "Yesterday 3:30 PM" }
        ]
      },
      {
        id: 3,
        doctorName: "Dr. Fatima Hassan",
        specialty: "General Practitioner",
        avatar: "👩‍⚕️",
        lastMessage: "Alright, I'll be waiting for you",
        lastMessageTime: "Sunday",
        unreadCount: 0,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "Doctor, our appointment is tomorrow at 11?", time: "Sunday 5:00 PM", status: "read" },
          { id: 2, sender: "doctor", text: "Yes, that's correct, at 11 AM", time: "Sunday 5:10 PM" },
          { id: 3, sender: "patient", text: "Perfect, thank you", time: "Sunday 5:12 PM", status: "read" },
          { id: 4, sender: "doctor", text: "Alright, I'll be waiting for you", time: "Sunday 5:15 PM" }
        ]
      },
      {
        id: 4,
        doctorName: "Dr. Ahmed Khaled",
        specialty: "Cardiologist",
        avatar: "👨‍⚕️",
        lastMessage: "The results are excellent, continue your treatment",
        lastMessageTime: "Saturday",
        unreadCount: 0,
        isOnline: false,
        messages: [
          { id: 1, sender: "patient", text: "Doctor, I received my test results", time: "Saturday 2:00 PM", status: "read" },
          { id: 2, sender: "doctor", text: "Great, let me review them", time: "Saturday 2:30 PM" },
          { id: 3, sender: "patient", text: "Is everything okay?", time: "Saturday 3:00 PM", status: "read" },
          { id: 4, sender: "doctor", text: "The results are excellent, continue your treatment", time: "Saturday 3:15 PM" }
        ]
      },
      {
        id: 5,
        doctorName: "Dr. Layla Youssef",
        specialty: "Neurologist",
        avatar: "👩‍⚕️",
        lastMessage: "Okay, I'll send you the prescription",
        lastMessageTime: "Friday",
        unreadCount: 1,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "Doctor, the medication has run out", time: "Friday 4:00 PM", status: "read" },
          { id: 2, sender: "doctor", text: "How much is left in the box?", time: "Friday 4:10 PM" },
          { id: 3, sender: "patient", text: "Only two pills", time: "Friday 4:12 PM", status: "read" },
          { id: 4, sender: "doctor", text: "Okay, I'll send you the prescription", time: "Friday 4:20 PM" }
        ]
      }
    ] : [
      {
        id: 1,
        doctorName: "د. سارة أحمد",
        specialty: "أخصائي أشعة",
        avatar: "👩‍⚕️",
        lastMessage: "سأراجع نتائج الأشعة وأرد عليك قريباً",
        lastMessageTime: "10:30 ص",
        unreadCount: 2,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "صباح الخير دكتورة، متى ستكون نتائج الأشعة جاهزة؟", time: "10:15 ص", status: "read" },
          { id: 2, sender: "doctor", text: "صباح النور، النتائج ستكون جاهزة اليوم بإذن الله", time: "10:20 ص" },
          { id: 3, sender: "patient", text: "شكراً جزيلاً، هل هناك شيء يجب أن أنتبه له؟", time: "10:25 ص", status: "read" },
          { id: 4, sender: "doctor", text: "سأراجع نتائج الأشعة وأرد عليك قريباً", time: "10:30 ص" }
        ]
      },
      {
        id: 2,
        doctorName: "د. محمد علي",
        specialty: "جراح عظام",
        avatar: "👨‍⚕️",
        lastMessage: "يمكنك حجز موعد يوم الخميس",
        lastMessageTime: "أمس",
        unreadCount: 0,
        isOnline: false,
        messages: [
          { id: 1, sender: "patient", text: "مرحباً دكتور، أشعر بألم في الركبة", time: "أمس 3:00 م", status: "read" },
          { id: 2, sender: "doctor", text: "مرحباً، هل الألم مستمر أم يأتي ويذهب؟", time: "أمس 3:15 م" },
          { id: 3, sender: "patient", text: "يزداد عند صعود السلم", time: "أمس 3:20 م", status: "read" },
          { id: 4, sender: "doctor", text: "يمكنك حجز موعد يوم الخميس", time: "أمس 3:30 م" }
        ]
      },
      {
        id: 3,
        doctorName: "د. فاطمة حسن",
        specialty: "طب عام",
        avatar: "👩‍⚕️",
        lastMessage: "تمام، سأكون بانتظارك",
        lastMessageTime: "الأحد",
        unreadCount: 0,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "دكتورة، موعدنا غداً الساعة 11؟", time: "الأحد 5:00 م", status: "read" },
          { id: 2, sender: "doctor", text: "نعم صحيح، الساعة 11 صباحاً", time: "الأحد 5:10 م" },
          { id: 3, sender: "patient", text: "ممتاز، شكراً", time: "الأحد 5:12 م", status: "read" },
          { id: 4, sender: "doctor", text: "تمام، سأكون بانتظارك", time: "الأحد 5:15 م" }
        ]
      },
      {
        id: 4,
        doctorName: "د. أحمد خالد",
        specialty: "أخصائي قلب",
        avatar: "👨‍⚕️",
        lastMessage: "النتائج ممتازة، استمر على العلاج",
        lastMessageTime: "السبت",
        unreadCount: 0,
        isOnline: false,
        messages: [
          { id: 1, sender: "patient", text: "دكتور، وصلتني نتائج التحاليل", time: "السبت 2:00 م", status: "read" },
          { id: 2, sender: "doctor", text: "رائع، دعني أراجعها", time: "السبت 2:30 م" },
          { id: 3, sender: "patient", text: "هل كل شيء على ما يرام؟", time: "السبت 3:00 م", status: "read" },
          { id: 4, sender: "doctor", text: "النتائج ممتازة، استمر على العلاج", time: "السبت 3:15 م" }
        ]
      },
      {
        id: 5,
        doctorName: "د. ليلى يوسف",
        specialty: "أخصائي أعصاب",
        avatar: "👩‍⚕️",
        lastMessage: "حسناً، سأرسل لك الوصفة",
        lastMessageTime: "الجمعة",
        unreadCount: 1,
        isOnline: true,
        messages: [
          { id: 1, sender: "patient", text: "دكتورة، الدواء انتهى", time: "الجمعة 4:00 م", status: "read" },
          { id: 2, sender: "doctor", text: "كم تبقى من العلبة؟", time: "الجمعة 4:10 م" },
          { id: 3, sender: "patient", text: "حبتين فقط", time: "الجمعة 4:12 م", status: "read" },
          { id: 4, sender: "doctor", text: "حسناً، سأرسل لك الوصفة", time: "الجمعة 4:20 م" }
        ]
      }
    ]
  );

  const currentConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = currentConversation?.messages || [];

  const filteredConversations = conversations.filter(conv =>
    conv.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const timeFormat = locale === "en" ? 'en-US' : 'ar-EG';
    const newMessage = {
      id: currentMessages.length + 1,
      sender: "patient",
      text: messageInput,
      time: new Date().toLocaleTimeString(timeFormat, { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };

    setConversations(conversations.map(conv => {
      if (conv.id === selectedChat) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          lastMessageTime: labels.now
        };
      }
      return conv;
    }));

    setMessageInput("");
    showToast(labels.toast.messageSent, "success");

    // Simulate doctor typing and response
    setTimeout(() => {
      const doctorReply = {
        id: currentMessages.length + 2,
        sender: "doctor",
        text: locale === "en" 
          ? "Thank you for your message, I'll get back to you soon"
          : "شكراً على رسالتك، سأرد عليك قريباً",
        time: new Date().toLocaleTimeString(timeFormat, { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(conversations.map(conv => {
        if (conv.id === selectedChat) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage, doctorReply],
            lastMessage: doctorReply.text,
            lastMessageTime: labels.now
          };
        }
        return conv;
      }));
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen bg-gray-50 dark:bg-slate-950 flex">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 flex flex-col">
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{labels.pageTitle}</h2>
            <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={labels.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedChat(conv.id);
                  setConversations(conversations.map(c => 
                    c.id === conv.id ? { ...c, unreadCount: 0 } : c
                  ));
                }}
                className={`p-4 border-b border-gray-200 dark:border-slate-700 cursor-pointer transition-colors ${
                  selectedChat === conv.id
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                      {conv.avatar}
                    </div>
                    {conv.isOnline && (
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {conv.doctorName}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {conv.specialty}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                      {currentConversation.avatar}
                    </div>
                    {currentConversation.isOnline && (
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {currentConversation.doctorName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentConversation.isOnline ? labels.online : labels.offline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(labels.toast.voiceCallSoon, "info")}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <FaPhone className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => showToast(labels.toast.videoCallSoon, "info")}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <FaVideo className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <FaEllipsisV className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "patient" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.sender === "patient"
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-tl-sm shadow"
                      }`}
                    >
                      <p className="text-sm mb-1">{message.text}</p>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span
                          className={`text-xs ${
                            message.sender === "patient"
                              ? "text-blue-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {message.time}
                        </span>
                        {message.sender === "patient" && (
                          <span className="text-white">
                            {message.status === "sent" && <FaCheck className="text-xs" />}
                            {message.status === "delivered" && <FaCheckDouble className="text-xs" />}
                            {message.status === "read" && <FaCheckDouble className="text-xs text-blue-300" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(labels.toast.attachFileSoon, "info")}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <FaPaperclip className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={labels.messagePlaceholder}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {labels.pressEnter}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {labels.emptyStateTitle}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {labels.emptyStateDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
