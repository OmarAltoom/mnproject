"use client";
import { useState } from "react";
import AdminLayout from "../AdminLayout";
import { useToast } from "@/app/components/ui/Toast";
import {
  FaGear,
  FaBell,
  FaLock,
  FaUsers,
  FaShieldHalved,
  FaFloppyDisk,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa6";
import useLocale from "@/app/hooks/useLocale";


export default function SettingsPage() {
  const { showToast, ToastContainer } = useToast();
  const { t, locale } = useLocale();
  const as = t.adminSettings || {};

  const tr = locale === "en"
    ? {
        breadcrumbs: { home: "Home", settings: "Settings" },
        header: {
          title: "System Settings",
          subtitle: "Manage system, notifications, and permissions",
        },
        tabs: { system: "System", notifications: "Notifications", permissions: "Permissions", security: "Security" },
        system: {
          hospitalInfo: {
            title: "Hospital Information",
            name: "Hospital Name",
            license: "License Number",
            emailPlaceholder: "Email",
            phonePlaceholder: "Phone number",
            address: "Address",
          },
          config: {
            title: "System Configuration",
            timezone: "Timezone",
            language: "Language",
            sessionTimeout: "Session timeout (minutes)",
            timezoneOptions: [
              { value: "Asia/Riyadh", label: "Asia/Riyadh" },
              { value: "Asia/Dubai", label: "Asia/Dubai" },
              { value: "Africa/Cairo", label: "Africa/Cairo" },
            ],
            languageOptions: [
              { value: "ar", label: "Arabic" },
              { value: "en", label: "English" },
            ],
          },
          backup: {
            title: "Backup Settings",
            autoBackup: "Enable automatic backup",
            frequency: "Backup frequency",
            options: [
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
            ],
          },
          upload: {
            title: "Upload Settings",
            maxSize: "Max file size (MB)",
            recommended: "Recommended max: 500 MB",
          },
          save: "Save Settings",
        },
        notifications: {
          title: "Notification Settings",
          channelsTitle: "Notification Channels",
          eventsTitle: "Event Notifications",
          channels: {
            email: "Email notifications",
            sms: "SMS notifications",
            push: "Push notifications",
          },
          events: {
            newUser: "New user alerts",
            appointment: "Appointment reminders",
            report: "Reports ready",
            system: "System alerts",
            monthly: "Monthly report",
          },
          save: "Save Notification Settings",
        },
        permissions: {
          save: "Save Permissions",
          roleLabels: { admin: "Admin", doctor: "Doctor", patient: "Patient" },
          labels: {
            viewDashboard: "View dashboard",
            manageUsers: "Manage users",
            managePatients: "Manage patients",
            manageDoctors: "Manage doctors",
            viewReports: "View reports",
            manageSettings: "Manage settings",
            viewAnalytics: "View analytics",
            manageRoles: "Manage roles",
            uploadAnalysis: "Upload analysis",
            bookAppointment: "Book appointments",
            viewChat: "View chat",
          },
        },
        security: {
          tipsTitle: "Security Tips",
          tips: [
            "Update passwords regularly",
            "Use two-factor authentication",
            "Perform regular backups",
            "Monitor login logs",
          ],
          authTitle: "Authentication Settings",
          twoFactor: "Two-factor authentication: enabled",
          encryption: "Encryption: enabled",
          limitTitle: "Login Attempts Limit",
          maxAttempts: "Allowed failed login attempts",
          lockoutMinutes: "Lockout duration (minutes)",
        },
        modal: {
          title: "Confirm Save",
          description: "Do you want to save your changes?",
          confirm: "Yes, save",
          cancel: "Cancel",
        },
        toastSaved: "Settings saved successfully",
      }
    : {
        breadcrumbs: { home: "الرئيسية", settings: "الإعدادات" },
        header: {
          title: "إعدادات النظام",
          subtitle: "إدارة إعدادات النظام والإشعارات والصلاحيات",
        },
        tabs: { system: "إعدادات النظام", notifications: "الإشعارات", permissions: "الصلاحيات", security: "الأمان" },
        system: {
          hospitalInfo: {
            title: "معلومات المستشفى",
            name: "اسم المستشفى",
            license: "رقم الترخيص",
            emailPlaceholder: "البريد الإلكتروني",
            phonePlaceholder: "رقم الهاتف",
            address: "العنوان",
          },
          config: {
            title: "إعدادات النظام",
            timezone: "المنطقة الزمنية",
            language: "اللغة",
            sessionTimeout: "مهلة انتهاء الجلسة (دقيقة)",
            timezoneOptions: [
              { value: "Asia/Riyadh", label: "آسيا/الرياض" },
              { value: "Asia/Dubai", label: "آسيا/دبي" },
              { value: "Africa/Cairo", label: "أفريقيا/القاهرة" },
            ],
            languageOptions: [
              { value: "ar", label: "العربية" },
              { value: "en", label: "الإنجليزية" },
            ],
          },
          backup: {
            title: "إعدادات النسخ الاحتياطي",
            autoBackup: "تفعيل النسخ الاحتياطي التلقائي",
            frequency: "تكرار النسخ",
            options: [
              { value: "daily", label: "يومي" },
              { value: "weekly", label: "أسبوعي" },
              { value: "monthly", label: "شهري" },
            ],
          },
          upload: {
            title: "إعدادات التحميل",
            maxSize: "أقصى حجم للملف (MB)",
            recommended: "الحد الأقصى الموصى به: 500 MB",
          },
          save: "حفظ الإعدادات",
        },
        notifications: {
          title: "إعدادات الإشعارات",
          channelsTitle: "قنوات الإشعار",
          eventsTitle: "إشعارات الأحداث",
          channels: {
            email: "إشعارات البريد الإلكتروني",
            sms: "إشعارات الرسائل النصية",
            push: "إشعارات دفع",
          },
          events: {
            newUser: "تنبيهات المستخدمين الجدد",
            appointment: "تذكيرات المواعيد",
            report: "التقارير الجاهزة",
            system: "تنبيهات النظام",
            monthly: "التقرير الشهري",
          },
          save: "حفظ إعدادات الإشعارات",
        },
        permissions: {
          save: "حفظ الصلاحيات",
          roleLabels: { admin: "مدير", doctor: "طبيب", patient: "مريض" },
          labels: {
            viewDashboard: "عرض لوحة التحكم",
            manageUsers: "إدارة المستخدمين",
            managePatients: "إدارة المرضى",
            manageDoctors: "إدارة الأطباء",
            viewReports: "عرض التقارير",
            manageSettings: "إدارة الإعدادات",
            viewAnalytics: "عرض التحليلات",
            manageRoles: "إدارة الصلاحيات",
            uploadAnalysis: "رفع التحليلات",
            bookAppointment: "حجز المواعيد",
            viewChat: "عرض المحادثات",
          },
        },
        security: {
          tipsTitle: "نصائح الأمان",
          tips: ["تحديث كلمات المرور بانتظام", "استخدام المصادقة الثنائية", "عمل نسخ احتياطية دورية", "مراقبة سجلات الدخول"],
          authTitle: "إعدادات المصادقة",
          twoFactor: "المصادقة الثنائية: مفعلة",
          encryption: "التشفير: مفعل",
          limitTitle: "حد المحاولات",
          maxAttempts: "عدد محاولات الدخول الفاشلة المسموحة",
          lockoutMinutes: "مدة الحظر (دقيقة)",
        },
        modal: {
          title: "تأكيد الحفظ",
          description: "هل تريد حفظ التغييرات التي أجريتها؟",
          confirm: "نعم، احفظ",
          cancel: "إلغاء",
        },
        toastSaved: "تم حفظ الإعدادات بنجاح",
      };

  const tabsLabels = { ...tr.tabs, ...(as.tabs || {}) };
  const breadcrumbLabels = { ...tr.breadcrumbs, ...(as.breadcrumbs || {}) };
  const headerLabels = { ...tr.header, ...(as.header || {}) };
  const systemLabels = {
    ...tr.system,
    ...(as.system || {}),
    hospitalInfo: { ...tr.system.hospitalInfo, ...(as.system?.hospitalInfo || {}) },
    config: { ...tr.system.config, ...(as.system?.config || {}) },
    backup: { ...tr.system.backup, ...(as.system?.backup || {}) },
    upload: { ...tr.system.upload, ...(as.system?.upload || {}) },
  };
  const notificationLabels = {
    ...tr.notifications,
    ...(as.notifications || {}),
    channels: { ...tr.notifications.channels, ...(as.notifications?.channels || {}) },
    events: { ...tr.notifications.events, ...(as.notifications?.events || {}) },
  };
  const permissionLabels = {
    ...tr.permissions,
    ...(as.permissions || {}),
    roleLabels: { ...tr.permissions.roleLabels, ...(as.permissions?.roleLabels || {}) },
    labels: { ...tr.permissions.labels, ...(as.permissions?.labels || {}) },
  };
  const securityLabels = { ...tr.security, ...(as.security || {}) };
  const modalLabels = { ...tr.modal, ...(as.modal || {}) };
  const toastSaved = as.toastSaved || tr.toastSaved;

  const timezoneOptions = systemLabels.config.timezoneOptions || tr.system.config.timezoneOptions;
  const languageOptions = systemLabels.config.languageOptions || tr.system.config.languageOptions;
  const backupFrequencyOptions = systemLabels.backup.options || tr.system.backup.options;
  const roleLabelMap = permissionLabels.roleLabels || {};
  const permissionLabelMap = permissionLabels.labels || {};
  const securityTips = securityLabels.tips || tr.security.tips;

  const tabs = [
    { id: "system", label: tabsLabels.system, icon: FaGear },
    { id: "notifications", label: tabsLabels.notifications, icon: FaBell },
    { id: "permissions", label: tabsLabels.permissions, icon: FaShieldHalved },
    { id: "security", label: tabsLabels.security, icon: FaLock },
  ];

  const channelItems = [
    { key: "emailNotifications", label: notificationLabels.channels.email },
    { key: "smsNotifications", label: notificationLabels.channels.sms },
    { key: "pushNotifications", label: notificationLabels.channels.push },
  ];

  const eventItems = [
    { key: "newUserAlert", label: notificationLabels.events.newUser },
    { key: "appointmentReminder", label: notificationLabels.events.appointment },
    { key: "reportReady", label: notificationLabels.events.report },
    { key: "systemAlert", label: notificationLabels.events.system },
    { key: "monthlyReport", label: notificationLabels.events.monthly },
  ];

  // State
  const [activeTab, setActiveTab] = useState("system");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    hospitalName: "مركز التشخيص الطبي",
    hospitalEmail: "info@hospital.com",
    hospitalPhone: "+966 12 3456789",
    address: "الرياض، المملكة العربية السعودية",
    licenseNumber: "LIC-2023-001",
    website: "www.hospital.com",
    supportEmail: "support@hospital.com",
    timezone: "Asia/Riyadh",
    language: "ar",
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    maxUploadSize: "500",
    sessionTimeout: "30",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newUserAlert: true,
    appointmentReminder: true,
    reportReady: true,
    systemAlert: true,
    monthlyReport: false,
  });

  // Role Permissions
  const [rolePermissions, setRolePermissions] = useState({
    admin: {
      viewDashboard: true,
      manageUsers: true,
      managePatients: true,
      manageDoctors: true,
      viewReports: true,
      manageSettings: true,
      viewAnalytics: true,
      manageRoles: true,
    },
    doctor: {
      viewDashboard: true,
      managePatients: true,
      viewReports: true,
      manageSettings: false,
      viewAnalytics: false,
      manageRoles: false,
      uploadAnalysis: true,
    },
    patient: {
      viewDashboard: true,
      viewReports: true,
      bookAppointment: true,
      viewAnalytics: false,
      manageSettings: false,
      viewChat: true,
    },
  });

  // Event Handlers
  const handleSystemSettingChange = (field, value) => {
    setSystemSettings({ ...systemSettings, [field]: value });
  };

  const handleNotificationChange = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlePermissionChange = (role, permission) => {
    setRolePermissions({
      ...rolePermissions,
      [role]: {
        ...rolePermissions[role],
        [permission]: !rolePermissions[role][permission],
      },
    });
  };

  const handleSaveSettings = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    showToast(toastSaved, "success");
    setShowSaveModal(false);
  };

  return (
    <AdminLayout breadcrumbs={[breadcrumbLabels.home, breadcrumbLabels.settings]}>
      <ToastContainer />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaGear className="text-4xl text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{headerLabels.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{headerLabels.subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                <TabIcon />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* System Settings Tab */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hospital Information */}
              <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{systemLabels.hospitalInfo.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.hospitalInfo.name}</label>
                    <input
                      type="text"
                      value={systemSettings.hospitalName}
                      onChange={(e) => handleSystemSettingChange("hospitalName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.hospitalInfo.license}</label>
                    <input
                      type="text"
                      value={systemSettings.licenseNumber}
                      onChange={(e) => handleSystemSettingChange("licenseNumber", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    <input
                      type="email"
                      value={systemSettings.hospitalEmail}
                      onChange={(e) => handleSystemSettingChange("hospitalEmail", e.target.value)}
                      placeholder={systemLabels.hospitalInfo.emailPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <input
                      type="tel"
                      value={systemSettings.hospitalPhone}
                      onChange={(e) => handleSystemSettingChange("hospitalPhone", e.target.value)}
                      placeholder={systemLabels.hospitalInfo.phonePlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.hospitalInfo.address}</label>
                    <input
                      type="text"
                      value={systemSettings.address}
                      onChange={(e) => handleSystemSettingChange("address", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* System Configuration */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{systemLabels.config.title}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.config.timezone}</label>
                    <select
                      value={systemSettings.timezone}
                      onChange={(e) => handleSystemSettingChange("timezone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      {timezoneOptions.map((zone) => (
                        <option key={zone.value} value={zone.value}>
                          {zone.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.config.language}</label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => handleSystemSettingChange("language", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      {languageOptions.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.config.sessionTimeout}</label>
                    <input
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => handleSystemSettingChange("sessionTimeout", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Backup Settings */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{systemLabels.backup.title}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">{systemLabels.backup.autoBackup}</span>
                    <button
                      onClick={() => handleSystemSettingChange("autoBackup", !systemSettings.autoBackup)}
                      className={`p-2 rounded-lg transition-colors ${
                        systemSettings.autoBackup ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {systemSettings.autoBackup ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.backup.frequency}</label>
                    <select
                      value={systemSettings.backupFrequency}
                      onChange={(e) => handleSystemSettingChange("backupFrequency", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      {backupFrequencyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Upload Settings */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{systemLabels.upload.title}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{systemLabels.upload.maxSize}</label>
                  <input
                    type="number"
                    value={systemSettings.maxUploadSize}
                    onChange={(e) => handleSystemSettingChange("maxUploadSize", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{systemLabels.upload.recommended}</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <FaFloppyDisk />
                <span>{systemLabels.save}</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{notificationLabels.title}</h3>
            <div className="space-y-4">
              {/* Channel Settings */}
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{notificationLabels.channelsTitle}</h4>
                {channelItems.map((channel) => (
                  <div key={channel.key} className="flex items-center justify-between p-3 mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{channel.label}</span>
                    <button
                      onClick={() => handleNotificationChange(channel.key)}
                      className={`p-2 rounded-lg transition-colors ${
                        notifications[channel.key] ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {notifications[channel.key] ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
                    </button>
                  </div>
                ))}
              </div>

              {/* Event Notifications */}
              <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{notificationLabels.eventsTitle}</h4>
                {eventItems.map((event) => (
                  <div key={event.key} className="flex items-center justify-between p-3 mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{event.label}</span>
                    <button
                      onClick={() => handleNotificationChange(event.key)}
                      className={`p-2 rounded-lg transition-colors ${
                        notifications[event.key] ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {notifications[event.key] ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <FaFloppyDisk />
              <span>{notificationLabels.save}</span>
            </button>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === "permissions" && (
          <div className="space-y-6">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-6">
                  <FaUsers className="text-2xl text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {roleLabelMap[role] || role}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(permissions).map(([permission, value]) => (
                    <div key={permission} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">{permissionLabelMap[permission] || permission}</span>
                      <button
                        onClick={() => handlePermissionChange(role, permission)}
                        className={`p-2 rounded-lg transition-colors ${
                          value ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {value ? <FaCheck className="text-xl" /> : "✕"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <FaFloppyDisk />
              <span>{permissionLabels.save}</span>
            </button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <FaShieldHalved className="text-2xl text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">{securityLabels.tipsTitle}</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    {securityTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{securityLabels.authTitle}</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">✓ {securityLabels.twoFactor}</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">✓ {securityLabels.encryption}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{securityLabels.limitTitle}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{securityLabels.maxAttempts}</label>
                  <input type="number" defaultValue="5" className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{securityLabels.lockoutMinutes}</label>
                  <input type="number" defaultValue="30" className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💾</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{modalLabels.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{modalLabels.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={confirmSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  {modalLabels.confirm}
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  {modalLabels.cancel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
