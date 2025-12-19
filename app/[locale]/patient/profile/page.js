"use client";

import { useState } from "react";
import { useToast } from "@/app/components/ui/Toast";
import useLocale from "@/app/hooks/useLocale";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaIdCard, FaHeartbeat, FaWeight, FaRuler, FaAllergies, FaNotesMedical, FaEdit, FaSave, FaTimes, FaBell, FaLock, FaLanguage, FaMoon, FaEye, FaEyeSlash } from "react-icons/fa";

export default function PatientProfilePage() {
    // Doctor change modal state
    const [showChangeDoctor, setShowChangeDoctor] = useState(false);

    // Doctor change request handler (frontend only)
    const handleSubmitChangeDoctor = (e) => {
      e.preventDefault();
      const form = e.target;
      const newDoctorValue = form.elements[0].value;
      const reasonValue = form.elements[1].value;
      let newDoctorLabel = "";
      if (newDoctorValue === "dr-fatima") newDoctorLabel = locale === "ar" ? "د. فاطمة علي (أشعة)" : "Dr. Fatima Ali (Radiology)";
      if (newDoctorValue === "dr-mohamed") newDoctorLabel = locale === "ar" ? "د. محمد أحمد (صدرية)" : "Dr. Mohamed Ahmed (Pulmonology)";
      if (newDoctorValue === "dr-saeed") newDoctorLabel = locale === "ar" ? "د. سعيد خالد (قلب)" : "Dr. Saeed Khalid (Cardiology)";
      // Import and call addDoctorChangeRequest
      import("@/app/api/doctor-change-requests").then(api => {
        api.addDoctorChangeRequest({
          patientName: profileData.fullName,
          newDoctor: newDoctorValue,
          newDoctorLabel,
          reason: reasonValue
        });
      });
      setShowChangeDoctor(false);
      showToast(locale === "ar" ? "تم إرسال طلب تغيير الطبيب للإدارة وسيتم مراجعته قريباً" : "Your doctor change request has been sent to admin for approval.", "success");
    };
  const { locale } = useLocale();
  const { showToast, ToastContainer } = useToast();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Comprehensive bilingual labels
  const labels = locale === "en" ? {
    // Page title
    pageTitle: "Personal Profile",
    pageSubtitle: "Manage your personal and health information",
    
    // Tabs
    tabPersonalInfo: "Personal Information",
    tabHealthInfo: "Health Information",
    tabNotifications: "Notifications",
    tabSecurity: "Security",
    
    // Profile header
    patientNumber: "Patient Number",
    activeAccount: "Active Account",
    memberSince: "Member since 2020",
    
    // Personal info section
    sectionPersonalInfo: "Personal Information",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    birthDate: "Date of Birth",
    nationalId: "National ID",
    bloodType: "Blood Type",
    address: "Address",
    gender: "Gender",
    male: "Male",
    female: "Female",
    
    // Body measurements
    sectionBodyMeasurements: "Body Measurements",
    height: "Height (cm)",
    weight: "Weight (kg)",
    bmi: "Body Mass Index (BMI)",
    bmiUnderweight: "Underweight",
    bmiNormal: "Normal",
    bmiOverweight: "Overweight",
    bmiObese: "Obese",
    
    // Emergency contact
    sectionEmergencyContact: "Emergency Contact",
    emergencyName: "Name",
    emergencyPhone: "Phone Number",
    emergencyRelation: "Relationship",
    relationWife: "Wife",
    relationHusband: "Husband",
    relationMother: "Mother",
    relationFather: "Father",
    relationBrother: "Brother",
    relationSister: "Sister",
    relationSon: "Son",
    relationDaughter: "Daughter",
    
    // Health info section
    sectionHealthInfo: "Health Information",
    allergies: "Allergies",
    chronicDiseases: "Chronic Diseases",
    currentMedications: "Current Medications",
    previousSurgeries: "Previous Surgeries",
    familyHistory: "Family History",
    
    // Notifications
    sectionNotifications: "Notification Settings",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive notifications via email",
    smsNotifications: "SMS Notifications",
    smsNotificationsDesc: "Receive notifications via SMS",
    pushNotifications: "Push Notifications",
    pushNotificationsDesc: "Receive app notifications",
    notificationPreferences: "Notification Preferences",
    appointmentReminders: "Appointment Reminders",
    reportUpdates: "Report Updates",
    medicationReminders: "Medication Reminders",
    healthTips: "Health Tips",
    
    // Security section
    sectionSecurity: "Security and Password",
    passwordTips: "Tips for a strong password:",
    passwordTip1: "✓ Use at least 8 characters",
    passwordTip2: "✓ Combine uppercase and lowercase letters",
    passwordTip3: "✓ Add numbers and special symbols",
    passwordTip4: "✓ Avoid using personal information",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    changePassword: "Change Password",
    activeSessions: "Active Sessions",
    currentDevice: "Current Device",
    activeNow: "Active Now",
    
    // Buttons
    btnEdit: "Edit",
    btnSave: "Save",
    btnCancel: "Cancel",
    
    // Toast messages
    toastSaveSuccess: "Changes saved successfully",
    toastCancelEdit: "Changes cancelled",
    toastPasswordMismatch: "Passwords do not match",
    toastPasswordLength: "Password must be at least 8 characters",
    toastPasswordChanged: "Password changed successfully",
    toastNotificationUpdated: "Notification settings updated"
  } : {
    // Page title
    pageTitle: "الحساب الشخصي",
    pageSubtitle: "إدارة معلوماتك الشخصية والصحية",
    
    // Tabs
    tabPersonalInfo: "المعلومات الشخصية",
    tabHealthInfo: "المعلومات الصحية",
    tabNotifications: "الإشعارات",
    tabSecurity: "الأمان",
    
    // Profile header
    patientNumber: "رقم المريض",
    activeAccount: "حساب نشط",
    memberSince: "عضو منذ 2020",
    
    // Personal info section
    sectionPersonalInfo: "المعلومات الشخصية",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    birthDate: "تاريخ الميلاد",
    nationalId: "رقم الهوية",
    bloodType: "فصيلة الدم",
    address: "العنوان",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    
    // Body measurements
    sectionBodyMeasurements: "القياسات الجسدية",
    height: "الطول (سم)",
    weight: "الوزن (كجم)",
    bmi: "مؤشر كتلة الجسم (BMI)",
    bmiUnderweight: "نحيف",
    bmiNormal: "طبيعي",
    bmiOverweight: "زيادة وزن",
    bmiObese: "سمنة",
    
    // Emergency contact
    sectionEmergencyContact: "جهة الاتصال الطارئة",
    emergencyName: "الاسم",
    emergencyPhone: "رقم الجوال",
    emergencyRelation: "صلة القرابة",
    relationWife: "زوجة",
    relationHusband: "زوج",
    relationMother: "أم",
    relationFather: "أب",
    relationBrother: "أخ",
    relationSister: "أخت",
    relationSon: "ابن",
    relationDaughter: "ابنة",
    
    // Health info section
    sectionHealthInfo: "المعلومات الصحية",
    allergies: "الحساسية",
    chronicDiseases: "الأمراض المزمنة",
    currentMedications: "الأدوية الحالية",
    previousSurgeries: "العمليات الجراحية السابقة",
    familyHistory: "التاريخ العائلي",
    
    // Notifications
    sectionNotifications: "إعدادات الإشعارات",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailNotificationsDesc: "استلام الإشعارات عبر البريد",
    smsNotifications: "إشعارات الرسائل النصية",
    smsNotificationsDesc: "استلام الإشعارات عبر SMS",
    pushNotifications: "الإشعارات الفورية",
    pushNotificationsDesc: "استلام إشعارات التطبيق",
    notificationPreferences: "تفضيلات الإشعارات",
    appointmentReminders: "تذكير بالمواعيد",
    reportUpdates: "تحديثات التقارير",
    medicationReminders: "تذكير بالأدوية",
    healthTips: "نصائح صحية",
    
    // Security section
    sectionSecurity: "الأمان وكلمة المرور",
    passwordTips: "نصائح لكلمة مرور قوية:",
    passwordTip1: "✓ استخدم 8 أحرف على الأقل",
    passwordTip2: "✓ اجمع بين الأحرف الكبيرة والصغيرة",
    passwordTip3: "✓ أضف أرقاماً ورموزاً خاصة",
    passwordTip4: "✓ تجنب استخدام معلومات شخصية",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    changePassword: "تغيير كلمة المرور",
    activeSessions: "الجلسات النشطة",
    currentDevice: "الجهاز الحالي",
    activeNow: "نشط الآن",
    
    // Buttons
    btnEdit: "تعديل",
    btnSave: "حفظ",
    btnCancel: "إلغاء",
    
    // Toast messages
    toastSaveSuccess: "تم حفظ التغييرات بنجاح",
    toastCancelEdit: "تم إلغاء التعديلات",
    toastPasswordMismatch: "كلمات المرور غير متطابقة",
    toastPasswordLength: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    toastPasswordChanged: "تم تغيير كلمة المرور بنجاح",
    toastNotificationUpdated: "تم تحديث إعدادات الإشعارات"
  };

  const [profileData, setProfileData] = useState(locale === "en" ? {
    fullName: "Ahmed Mohammed Ali",
    email: "ahmed.ali@example.com",
    phone: "0501234567",
    birthDate: "1983-05-15",
    gender: "Male",
    nationalId: "1234567890",
    address: "Riyadh, Al-Nakheel District, King Fahd Street",
    bloodType: "O+",
    height: "175",
    weight: "72",
    emergencyContactName: "Fatima Ali",
    emergencyContactPhone: "0509876543",
    emergencyContactRelation: "Wife"
  } : {
    fullName: "أحمد محمد علي",
    email: "ahmed.ali@example.com",
    phone: "0501234567",
    birthDate: "1983-05-15",
    gender: "ذكر",
    nationalId: "1234567890",
    address: "الرياض، حي النخيل، شارع الملك فهد",
    bloodType: "O+",
    height: "175",
    weight: "72",
    emergencyContactName: "فاطمة علي",
    emergencyContactPhone: "0509876543",
    emergencyContactRelation: "زوجة"
  });

  const [healthData, setHealthData] = useState(locale === "en" ? {
    allergies: ["Dust Allergy", "Penicillin Allergy"],
    chronicDiseases: ["High Blood Pressure"],
    medications: ["Amlodipine 5mg - Once daily"],
    surgeries: ["Appendectomy - 2015"],
    familyHistory: ["Diabetes (Father)", "High Blood Pressure (Mother)"]
  } : {
    allergies: ["حساسية الغبار", "حساسية البنسلين"],
    chronicDiseases: ["ضغط الدم المرتفع"],
    medications: ["أملوديبين 5mg - مرة يومياً"],
    surgeries: ["استئصال الزائدة الدودية - 2015"],
    familyHistory: ["السكري (الأب)", "ضغط الدم (الأم)"]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    reportUpdates: true,
    medicationReminders: true,
    healthTips: false
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const calculateBMI = () => {
    const heightM = parseFloat(profileData.height) / 100;
    const weightKg = parseFloat(profileData.weight);
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    return bmi;
  };

  const getBMIStatus = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { text: labels.bmiUnderweight, color: "text-blue-600 dark:text-blue-400" };
    if (bmi < 25) return { text: labels.bmiNormal, color: "text-green-600 dark:text-green-400" };
    if (bmi < 30) return { text: labels.bmiOverweight, color: "text-orange-600 dark:text-orange-400" };
    return { text: labels.bmiObese, color: "text-red-600 dark:text-red-400" };
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    showToast(labels.toastSaveSuccess, "success");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    showToast(labels.toastCancelEdit, "info");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast(labels.toastPasswordMismatch, "error");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showToast(labels.toastPasswordLength, "error");
      return;
    }
    showToast(labels.toastPasswordChanged, "success");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings({ ...notificationSettings, [key]: !notificationSettings[key] });
    showToast(labels.toastNotificationUpdated, "success");
  };

  const bmiStatus = getBMIStatus();

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{labels.pageTitle}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{labels.pageSubtitle}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-yellow-400 to-red-600 flex items-center justify-center text-white text-4xl font-bold">
              {profileData.fullName.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.fullName}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{labels.patientNumber}: {profileData.nationalId}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaEnvelope className="text-blue-500" />
                  {profileData.email}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaPhone className="text-green-500" />
                  {profileData.phone}
                </span>
              </div>
            </div>
            <div className={locale === "en" ? "text-right" : "text-left"}>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-2">
                {labels.activeAccount}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{labels.memberSince}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 mb-8">
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaUser className={locale === "en" ? "inline mr-2" : "inline ml-2"} />
              {labels.tabPersonalInfo}
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "health"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaHeartbeat className={locale === "en" ? "inline mr-2" : "inline ml-2"} />
              {labels.tabHealthInfo}
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "notifications"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaBell className={locale === "en" ? "inline mr-2" : "inline ml-2"} />
              {labels.tabNotifications}
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "security"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaLock className={locale === "en" ? "inline mr-2" : "inline ml-2"} />
              {labels.tabSecurity}
            </button>
          </div>

          <div className="p-6">
      {/* ...existing code... */}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{labels.sectionPersonalInfo}</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FaEdit />
                      <span>{labels.btnEdit}</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaSave />
                        <span>{labels.btnSave}</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaTimes />
                        <span>{labels.btnCancel}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaUser className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-blue-500`} />
                      {labels.fullName}
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaEnvelope className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-green-500`} />
                      {labels.email}
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaPhone className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-orange-500`} />
                      {labels.phone}
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaCalendarAlt className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-purple-500`} />
                      {labels.birthDate}
                    </label>
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaIdCard className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-red-500`} />
                      {labels.nationalId}
                    </label>
                    <input
                      type="text"
                      value={profileData.nationalId}
                      onChange={(e) => setProfileData({ ...profileData, nationalId: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaHeartbeat className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-pink-500`} />
                      {labels.bloodType}
                    </label>
                    <select
                      value={profileData.bloodType}
                      onChange={(e) => setProfileData({ ...profileData, bloodType: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaMapMarkerAlt className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-blue-500`} />
                      {labels.address}
                    </label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Body Measurements */}
                <div className="border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{labels.sectionBodyMeasurements}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaRuler className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-blue-500`} />
                        {labels.height}
                      </label>
                      <input
                        type="number"
                        value={profileData.height}
                        onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <FaWeight className={`inline ${locale === "en" ? "mr-2" : "ml-2"} text-green-500`} />
                        {labels.weight}
                      </label>
                      <input
                        type="number"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {labels.bmi}
                      </label>
                      <div className="px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-800">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{calculateBMI()}</span>
                        <span className={`${locale === "en" ? "ml-2" : "mr-2"} text-sm font-medium ${bmiStatus.color}`}>({bmiStatus.text})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{labels.sectionEmergencyContact}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.emergencyName}</label>
                      <input
                        type="text"
                        value={profileData.emergencyContactName}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContactName: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.emergencyPhone}</label>
                      <input
                        type="tel"
                        value={profileData.emergencyContactPhone}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContactPhone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{labels.emergencyRelation}</label>
                      <input
                        type="text"
                        value={profileData.emergencyContactRelation}
                        onChange={(e) => setProfileData({ ...profileData, emergencyContactRelation: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Health Tab */}
            {activeTab === "health" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{labels.sectionHealthInfo}</h3>

                <div className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-red-900 dark:text-red-300 mb-3 flex items-center gap-2">
                      <FaAllergies />
                      {labels.allergies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {healthData.allergies.map((allergy, idx) => (
                        <span key={idx} className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-3 flex items-center gap-2">
                      <FaNotesMedical />
                      {labels.chronicDiseases}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {healthData.chronicDiseases.map((disease, idx) => (
                        <span key={idx} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm">
                          {disease}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">{labels.currentMedications}</h4>
                    <ul className="space-y-2">
                      {healthData.medications.map((med, idx) => (
                        <li key={idx} className="text-blue-700 dark:text-blue-300 flex items-start gap-2">
                          <span>💊</span>
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-3">{labels.previousSurgeries}</h4>
                    <ul className="space-y-2">
                      {healthData.surgeries.map((surgery, idx) => (
                        <li key={idx} className="text-purple-700 dark:text-purple-300 flex items-start gap-2">
                          <span>🏥</span>
                          <span>{surgery}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="font-bold text-green-900 dark:text-green-300 mb-3">{labels.familyHistory}</h4>
                    <ul className="space-y-2">
                      {healthData.familyHistory.map((history, idx) => (
                        <li key={idx} className="text-green-700 dark:text-green-300 flex items-start gap-2">
                          <span>👨‍👩‍👦</span>
                          <span>{history}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{labels.sectionNotifications}</h3>

                <div className="space-y-4">
                  <div className="space-y-6">
                    {/* Doctor Info & Change Request */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">{locale === "ar" ? "الطبيب الحالي" : "Current Doctor"}</h3>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                        <div className="flex-1">
                          <div className="text-base font-semibold text-gray-900 dark:text-white">د. فاطمة علي</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{locale === "ar" ? "أشعة" : "Radiology"}</div>
                          <span className="inline-block mt-1 rounded-md px-2 py-0.5 text-xs ring-1 ring-blue-200 bg-blue-100 text-blue-700">{locale === "ar" ? "نشطة" : "Active"}</span>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button onClick={() => setShowChangeDoctor(true)} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                            {locale === "ar" ? "طلب تغيير الطبيب" : "Request Doctor Change"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Change Doctor Modal */}
                    {showChangeDoctor && (
                      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{locale === "ar" ? "طلب تغيير الطبيب" : "Request Doctor Change"}</h3>
                          <form onSubmit={handleSubmitChangeDoctor} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{locale === "ar" ? "اختر الطبيب الجديد" : "Select New Doctor"}</label>
                              <select required className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
                                <option value="">{locale === "ar" ? "اختر الطبيب" : "Choose doctor"}</option>
                                <option value="dr-fatima">{locale === "ar" ? "د. فاطمة علي (أشعة)" : "Dr. Fatima Ali (Radiology)"}</option>
                                <option value="dr-mohamed">{locale === "ar" ? "د. محمد أحمد (صدرية)" : "Dr. Mohamed Ahmed (Pulmonology)"}</option>
                                <option value="dr-saeed">{locale === "ar" ? "د. سعيد خالد (قلب)" : "Dr. Saeed Khalid (Cardiology)"}</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{locale === "ar" ? "سبب تغيير الطبيب" : "Reason for change"}</label>
                              <textarea required rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white" placeholder={locale === "ar" ? "اكتب السبب هنا..." : "Write your reason here..."}></textarea>
                            </div>
                            <div className="flex gap-3 mt-6">
                              <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                                {locale === "ar" ? "إرسال الطلب" : "Submit Request"}
                              </button>
                              <button type="button" onClick={() => setShowChangeDoctor(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                                {locale === "ar" ? "إلغاء" : "Cancel"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{labels.emailNotifications}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{labels.emailNotificationsDesc}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("emailNotifications")}
                      className={`w-14 h-7 rounded-full transition-colors ${
                        notificationSettings.emailNotifications ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificationSettings.emailNotifications ? "translate-x-8" : "translate-x-1"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{labels.smsNotifications}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{labels.smsNotificationsDesc}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("smsNotifications")}
                      className={`w-14 h-7 rounded-full transition-colors ${
                        notificationSettings.smsNotifications ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificationSettings.smsNotifications ? "translate-x-8" : "translate-x-1"
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{labels.pushNotifications}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{labels.pushNotificationsDesc}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle("pushNotifications")}
                      className={`w-14 h-7 rounded-full transition-colors ${
                        notificationSettings.pushNotifications ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notificationSettings.pushNotifications ? "translate-x-8" : "translate-x-1"
                      }`} />
                    </button>
                  </div>

                  <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">{labels.notificationPreferences}</h4>
                    
                    <div className="space-y-3">
                      {[
                        { key: "appointmentReminders", label: labels.appointmentReminders },
                        { key: "reportUpdates", label: labels.reportUpdates },
                        { key: "medicationReminders", label: labels.medicationReminders },
                        { key: "healthTips", label: labels.healthTips }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{item.label}</span>
                          <button
                            onClick={() => handleNotificationToggle(item.key)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              notificationSettings[item.key] ? "bg-green-600 dark:bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                              notificationSettings[item.key] ? "translate-x-7" : "translate-x-1"
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{labels.sectionSecurity}</h3>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{labels.passwordTips}</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>{labels.passwordTip1}</li>
                    <li>{labels.passwordTip2}</li>
                    <li>{labels.passwordTip3}</li>
                    <li>{labels.passwordTip4}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {labels.currentPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                        className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white ${locale === "en" ? "pr-12" : "pl-12"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className={`absolute ${locale === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
                      >
                        {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {labels.newPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white ${locale === "en" ? "pr-12" : "pl-12"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={`absolute ${locale === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {labels.confirmPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white ${locale === "en" ? "pr-12" : "pl-12"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute ${locale === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400`}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    {labels.changePassword}
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-6 mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">{labels.activeSessions}</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">💻 Windows - Chrome</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {locale === "en" ? "Riyadh, Saudi Arabia - Active Now" : "الرياض، السعودية - نشط الآن"}
                          </p>
                        </div>
                        <span className="text-green-600 dark:text-green-400 text-sm">{labels.currentDevice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
