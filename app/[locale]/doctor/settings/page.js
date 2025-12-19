"use client";

import DoctorLayout from "../DoctorLayout";
import { useToast } from "@/app/components/ui/Toast";
import { useState } from "react";
import {
  FaUser,
  FaClock,
  FaBell,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaSave,
  FaUserMd,
  FaStethoscope,
  FaCalendarAlt,
  FaSms,
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import useLocale from "@/app/hooks/useLocale";

export default function DoctorSettingsPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const ds = t.doctorSettings || {};

  const labels = locale === "en"
    ? {
        title: "Account Settings",
        subtitle: "Manage your account information and preferences",
        tabs: {
          profile: "Personal Info",
          availability: "Availability",
          notifications: "Notifications",
          security: "Security",
        },
        profile: {
          header: "Personal Information",
          name: "Full Name",
          specialty: "Specialty",
          email: "Email",
          phone: "Phone",
          license: "License Number",
          bio: "Professional Bio",
          save: "Save Changes",
          toast: { saved: "Profile saved successfully" },
        },
        availability: {
          header: "Working Hours",
          workDays: "Work Days",
          startTime: "Start Time",
          endTime: "End Time",
          slotDuration: "Appointment Duration (minutes)",
          maxPatients: "Max Patients Per Day",
          save: "Save Changes",
          toast: { saved: "Availability updated successfully" },
        },
        notifications: {
          header: "Notification Settings",
          email: "Email Notifications",
          sms: "SMS Notifications",
          push: "Push Notifications",
          newAppointment: "New Appointment Alerts",
          appointmentReminder: "Appointment Reminders",
          patientMessages: "Patient Messages",
          systemUpdates: "System Updates",
          save: "Save Changes",
          toast: { saved: "Notification settings saved" },
        },
        security: {
          header: "Password & Security",
          currentPassword: "Current Password",
          newPassword: "New Password",
          confirmPassword: "Confirm Password",
          save: "Update Password",
          toast: { saved: "Password updated successfully", mismatch: "Passwords do not match" },
        },
      }
    : {
        title: "إعدادات الحساب",
        subtitle: "إدارة معلومات حسابك وتفضيلاتك",
        tabs: {
          profile: "المعلومات الشخصية",
          availability: "أوقات العمل",
          notifications: "الإشعارات",
          security: "الأمان",
        },
        profile: {
          header: "المعلومات الشخصية",
          name: "الاسم الكامل",
          specialty: "التخصص",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          license: "رقم الترخيص",
          bio: "السيرة المهنية",
          save: "حفظ التغييرات",
          toast: { saved: "تم حفظ الملف الشخصي بنجاح" },
        },
        availability: {
          header: "ساعات العمل",
          workDays: "أيام العمل",
          startTime: "وقت البدء",
          endTime: "وقت الانتهاء",
          slotDuration: "مدة الموعد (دقائق)",
          maxPatients: "عدد المرضى في اليوم",
          save: "حفظ التغييرات",
          toast: { saved: "تم تحديث التوفر بنجاح" },
        },
        notifications: {
          header: "إعدادات الإشعارات",
          email: "إشعارات البريد",
          sms: "إشعارات SMS",
          push: "إشعارات الدفع",
          newAppointment: "تنبيهات الموعد الجديد",
          appointmentReminder: "تذكير بالموعد",
          patientMessages: "رسائل المرضى",
          systemUpdates: "تحديثات النظام",
          save: "حفظ التغييرات",
          toast: { saved: "تم حفظ إعدادات الإشعارات" },
        },
        security: {
          header: "كلمة السر والأمان",
          currentPassword: "كلمة السر الحالية",
          newPassword: "كلمة السر الجديدة",
          confirmPassword: "تأكيد كلمة السر",
          save: "تحديث كلمة السر",
          toast: { saved: "تم تحديث كلمة السر بنجاح", mismatch: "كلمات السر غير متطابقة" },
        },
      };

  // Profile Settings (bilingual)
  const profileTemplate = locale === "en" 
    ? {
        name: "Dr. Ahmed Mohammed",
        specialty: "Diagnostic Radiologist",
        email: "dr.ahmed@hospital.com",
        phone: "+966 50 123 4567",
        bio: "15 years of experience in diagnostic radiology and medical imaging",
        licenseNumber: "MED-2024-15678",
      }
    : {
        name: "د. أحمد محمد",
        specialty: "أخصائي الأشعة التشخيصية",
        email: "dr.ahmed@hospital.com",
        phone: "+966 50 123 4567",
        bio: "خبرة 15 عاماً في مجال الأشعة التشخيصية والتصوير الطبي",
        licenseNumber: "MED-2024-15678",
      };

  const [profile, setProfile] = useState(profileTemplate);

  // Availability Settings (bilingual)
  const availabilityTemplate = locale === "en"
    ? {
        workDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        startTime: "08:00",
        endTime: "16:00",
        slotDuration: "30",
        maxPatients: "20",
      }
    : {
        workDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
        startTime: "08:00",
        endTime: "16:00",
        slotDuration: "30",
        maxPatients: "20",
      };

  const [availability, setAvailability] = useState(availabilityTemplate);

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newAppointment: true,
    appointmentReminder: true,
    patientMessages: true,
    systemUpdates: false,
  });

  // Security Settings
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    showToast(labels.profile.toast.saved, "success");
  };

  const handleSaveAvailability = () => {
    showToast(labels.availability.toast.saved, "success");
  };

  const handleSaveNotifications = () => {
    showToast(labels.notifications.toast.saved, "success");
  };

  const handleChangePassword = () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      showToast(locale === "en" ? "Please fill all password fields" : "يرجى ملء جميع حقول كلمة السر", "error");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      showToast(labels.security.toast.mismatch, "error");
      return;
    }
    if (security.newPassword.length < 8) {
      showToast(locale === "en" ? "Password must be at least 8 characters" : "كلمة السر يجب أن تكون 8 أحرف على الأقل", "error");
      return;
    }
    showToast(labels.security.toast.saved, "success");
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const allDays = locale === "en"
    ? ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    : ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  const tabs = [
    { id: "profile", label: labels.tabs.profile, icon: FaUser },
    { id: "availability", label: labels.tabs.availability, icon: FaClock },
    { id: "notifications", label: labels.tabs.notifications, icon: FaBell },
    { id: "security", label: labels.tabs.security, icon: FaLock },
  ];

  return (
    <DoctorLayout>
      <ToastContainer />
      <div
        className={`min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 text-gray-900 dark:text-gray-100
        [&_div.bg-white]:dark:bg-zinc-900 [&_div.bg-white]:dark:border-zinc-800
        [&_p.text-gray-900]:dark:text-white [&_p.text-gray-600]:dark:text-gray-300 [&_p.text-gray-500]:dark:text-gray-400
        [&_span.text-gray-900]:dark:text-white [&_span.text-gray-600]:dark:text-gray-300
        [&_input.bg-white]:dark:bg-zinc-900 [&_input.border-gray-300]:dark:border-zinc-700 [&_input.text-gray-900]:dark:text-gray-100
        [&_textarea.bg-white]:dark:bg-zinc-900 [&_textarea.border-gray-300]:dark:border-zinc-700 [&_textarea.text-gray-900]:dark:text-gray-100`}
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FaUserMd className="text-blue-600" />
              {labels.title}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{labels.subtitle}</p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="mb-6 flex items-center gap-3">
                <FaUserMd className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{labels.profile.header}</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaUser className="inline ml-2" />
                    {labels.profile.name}
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaStethoscope className="inline ml-2" />
                    {labels.profile.specialty}
                  </label>
                  <input
                    type="text"
                    value={profile.specialty}
                    onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaEnvelope className="inline ml-2" />
                    {labels.profile.email}
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FaPhone className="inline ml-2" />
                    {labels.profile.phone}
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {labels.profile.license}
                  </label>
                  <input
                    type="text"
                    value={profile.licenseNumber}
                    onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">{labels.profile.bio}</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaSave />
                {labels.profile.save}
              </button>
            </div>
          )}

          {/* Availability Settings */}
          {activeTab === "availability" && (
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="mb-6 flex items-center gap-3">
                <FaClock className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{labels.availability.header}</h2>
              </div>

              <div className="space-y-6">
                {/* Work Days */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    <FaCalendarAlt className="inline ml-2" />
                    {ds.availability?.workDays || "Work Days"}
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                    {allDays.map(
                      (day) => (
                        <button
                          key={day}
                          onClick={() => {
                            setAvailability({
                              ...availability,
                              workDays: availability.workDays.includes(day)
                                ? availability.workDays.filter((d) => d !== day)
                                : [...availability.workDays, day],
                            });
                          }}
                          className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                            availability.workDays.includes(day)
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">{ds.availability?.startTime || "Start Time"}</label>
                    <input
                      type="time"
                      value={availability.startTime}
                      onChange={(e) =>
                        setAvailability({ ...availability, startTime: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">{ds.availability?.endTime || "End Time"}</label>
                    <input
                      type="time"
                      value={availability.endTime}
                      onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {ds.availability?.slotDuration || "Appointment Duration (minutes)"}
                    </label>
                    <select
                      value={availability.slotDuration}
                      onChange={(e) =>
                        setAvailability({ ...availability, slotDuration: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="15">15 {locale === "en" ? "minutes" : "دقيقة"}</option>
                      <option value="30">30 {locale === "en" ? "minutes" : "دقيقة"}</option>
                      <option value="45">45 {locale === "en" ? "minutes" : "دقيقة"}</option>
                      <option value="60">60 {locale === "en" ? "minutes" : "دقيقة"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {ds.availability?.maxPatients || "Max Patients Per Day"}
                    </label>
                    <input
                      type="number"
                      value={availability.maxPatients}
                      onChange={(e) =>
                        setAvailability({ ...availability, maxPatients: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveAvailability}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaSave />
                {ds.availability?.saveButton || "Save Hours"}
              </button>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="mb-6 flex items-center gap-3">
                <FaBell className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{ds.notifications?.title || "Notification Settings"}</h2>
              </div>

              <div className="space-y-6">
                {/* General Notification Methods */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">{locale === "en" ? "Communication Methods" : "طرق التواصل"}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-xl text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{ds.notifications?.email || "Email Notifications"}</p>
                          <p className="text-sm text-gray-600">
                            {locale === "en" ? "Receive notifications via email" : "استلام الإشعارات عبر بريد إلكتروني"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            emailNotifications: !notifications.emailNotifications,
                          })
                        }
                        className="text-3xl"
                      >
                        {notifications.emailNotifications ? (
                          <FaToggleOn className="text-blue-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-3">
                        <FaSms className="text-xl text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{ds.notifications?.sms || "SMS Notifications"}</p>
                          <p className="text-sm text-gray-600">{locale === "en" ? "Receive notifications via SMS" : "استلام الإشعارات عبر SMS"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            smsNotifications: !notifications.smsNotifications,
                          })
                        }
                        className="text-3xl"
                      >
                        {notifications.smsNotifications ? (
                          <FaToggleOn className="text-green-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-3">
                        <FaBell className="text-xl text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-900">{ds.notifications?.push || "Push Notifications"}</p>
                          <p className="text-sm text-gray-600">{locale === "en" ? "Receive notifications in app" : "استلام الإشعارات داخل التطبيق"}</p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            pushNotifications: !notifications.pushNotifications,
                          })
                        }
                        className="text-3xl"
                      >
                        {notifications.pushNotifications ? (
                          <FaToggleOn className="text-purple-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">{locale === "en" ? "Notification Types" : "أنواع الإشعارات"}</h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: "newAppointment",
                        label: ds.notifications?.newAppointment || "New Appointments",
                        desc: locale === "en" ? "When a new appointment is booked" : "عند حجز موعد جديد",
                      },
                      {
                        key: "appointmentReminder",
                        label: ds.notifications?.appointmentReminder || "Appointment Reminders",
                        desc: locale === "en" ? "One hour before appointment" : "قبل الموعد بساعة",
                      },
                      {
                        key: "patientMessages",
                        label: ds.notifications?.patientMessages || "Patient Messages",
                        desc: locale === "en" ? "When receiving a new message" : "عند استلام رسالة جديدة",
                      },
                      {
                        key: "systemUpdates",
                        label: ds.notifications?.systemUpdates || "System Updates",
                        desc: locale === "en" ? "About system updates" : "إشعارات حول التحديثات",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <button
                          onClick={() =>
                            setNotifications({
                              ...notifications,
                              [item.key]: !notifications[item.key],
                            })
                          }
                          className="text-3xl"
                        >
                          {notifications[item.key] ? (
                            <FaToggleOn className="text-blue-600" />
                          ) : (
                            <FaToggleOff className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveNotifications}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaSave />
                {ds.notifications?.saveButton || "Save Preferences"}
              </button>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="rounded-xl bg-white p-8 shadow-lg border border-gray-100">
              <div className="mb-6 flex items-center gap-3">
                <FaLock className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{ds.security?.title || "Change Password"}</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {ds.security?.current || "Current Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      value={security.currentPassword}
                      onChange={(e) =>
                        setSecurity({ ...security, currentPassword: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({ ...showPassword, current: !showPassword.current })
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {ds.security?.new || "New Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={security.newPassword}
                      onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{ds.security?.minLength || "Password must be at least 8 characters"}</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {ds.security?.confirm || "Confirm Password"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={security.confirmPassword}
                      onChange={(e) =>
                        setSecurity({ ...security, confirmPassword: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaLock />
                {ds.security?.changeButton || "Change Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
}
