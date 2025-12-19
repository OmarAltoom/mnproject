"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheck, FaStethoscope, FaBed, FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaPhone } from "react-icons/fa6";
import { Link } from "@/i18n/routing";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useLocaleContext } from "../hooks/useLocaleContext";

export default function SignUpForm() {
  const locale = useLocale();
  const t = useTranslations();
  const { toggleLocale } = useLocaleContext();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "doctor",
    doctorId: "",
    licenseNumber: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const doctors = useMemo(
    () =>
      locale === "en"
        ? [
            { id: "1", name: "Dr. Ahmed Ali", specialty: "Pulmonology", rating: 4.8 },
            { id: "2", name: "Dr. Sarah Youssef", specialty: "Respiratory Medicine", rating: 4.5 },
            { id: "3", name: "Dr. Khaled Mansour", specialty: "Internal Medicine", rating: 4.2 },
          ]
        : [
            { id: "1", name: "د. أحمد علي", specialty: "أمراض الصدرية", rating: 4.8 },
            { id: "2", name: "د. سارة يوسف", specialty: "الرئة والجهاز التنفسي", rating: 4.5 },
            { id: "3", name: "د. خالد منصور", specialty: "الطب الباطني", rating: 4.2 },
          ],
    [locale]
  );

  const passwordHints = [
    t("auth.signup.passwordHint1") || "8 أحرف على الأقل",
    t("auth.signup.passwordHint2") || "حرف كبير واحد",
    t("auth.signup.passwordHint3") || "رقم واحد",
    t("auth.signup.passwordHint4") || "رمز خاص"
  ];
  const passwordStrengthLabel = t("auth.signup.passwordStrengthLabel") || (locale === "en" ? "Password strength:" : "قوة كلمة المرور:");
  const haveAccountText = t("auth.signup.haveAccount") || (locale === "en" ? "Already have an account?" : "لديك حساب بالفعل؟");
  const loginText = t("auth.signup.loginCta") || "تسجيل الدخول";

  const passwordChecks = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(form.password),
  };

  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleUserTypeChange = (type) => {
    setForm({ ...form, userType: type, doctorId: "" });
    setError("");
    setSuccess("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  // =====================
  // VALIDATIONS (كما هي)
  // =====================
  if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
    setError("يرجى تعبئة جميع الحقول المطلوبة");
    return;
  }

  if (form.userType === "doctor") {
    if (!form.licenseNumber.trim() || !form.phone.trim()) {
      setError("رقم الترخيص ورقم الجوال للطبيب مطلوبة");
      return;
    }
  }

  if (form.userType === "patient") {
    if (!form.doctorId) {
      setError("يرجى اختيار الطبيب المعالج");
      return;
    }
  }

  if (form.password !== form.confirmPassword) {
    setError("كلمتا المرور غير متطابقتين");
    return;
  }

  if (!isPasswordStrong) {
    setError("كلمة المرور لا تستوفي جميع المتطلبات");
    return;
  }

  // =====================
  // SUPABASE LOGIC
  // =====================
  setLoading(true);

  // 1️⃣ إنشاء المستخدم (Auth)
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.password,
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  const userId = data.user.id;

  // 2️⃣ تخزين باقي البيانات (profiles)
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    full_name: form.name,
    role: form.userType, // doctor | patient
    phone: form.userType === "doctor" ? form.phone : null,
    license_number: form.userType === "doctor" ? form.licenseNumber : null,
    doctor_id: form.userType === "patient" ? form.doctorId : null,
  });

  if (profileError) {
    setError(profileError.message);
    setLoading(false);
    return;
  }

  setLoading(false);

  // =====================
  // SUCCESS FLOW (كما بدك)
  // =====================
  if (form.userType === "doctor") {
    setSuccess(
      locale === "en"
        ? "Your registration is pending admin approval. You will be notified when approved."
        : "تم استلام طلبك كطبيب وسيتم مراجعته من الإدارة. سيتم إشعارك عند الموافقة."
    );
  } else {
    setSuccess("تم إنشاء الحساب بنجاح! يتم إعادة التوجيه...");
    setTimeout(() => {
      window.location.href = locale === "ar" ? "/ar/login" : "/en/login";
    }, 2000);
  }
};


  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-y-auto" dir={dir} lang={locale}>
      {/* خلفية متحركة */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/4 w-96 h-96 bg-yellow-400 opacity-5 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-red-500 opacity-5 rounded-full blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex flex-col w-full h-full max-w-none bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl backdrop-blur-xl border border-yellow-400/20 dark:border-yellow-400/10 p-8"
      >
        {/* Section 1: Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="inline-block p-4 bg-linear-to-br from-yellow-400 to-red-600 rounded-full shadow-xl">
              <FaUserPlus className="text-4xl text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">{t("auth.signup.title") || "إنشاء حساب جديد"}</h2>
              <p className="text-zinc-600 dark:text-gray-400 text-base">{t("auth.signup.subtitle") || "انضم لمنصتنا الطبية المتقدمة"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors font-medium text-sm"
            title={locale === "ar" ? "Switch to English" : "التبديل للعربية"}
          >
            <span>🌐</span>
            <span>{locale === "ar" ? "EN" : "AR"}</span>
          </button>
        </div>

        {/* Section 2: Social Login */}
        <div className="mb-6 pb-6 border-b border-yellow-400/10">
          <div className="flex items-center justify-center gap-4">
            <button type="button" className="flex-1 max-w-40 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all hover:scale-105 ring-2 ring-blue-400/30 flex items-center justify-center gap-2 font-medium" title="Facebook">
              <FaFacebook className="text-xl" />
              <span className="text-sm">Facebook</span>
            </button>
            <button type="button" className="flex-1 max-w-40 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all hover:scale-105 ring-2 ring-red-400/30 flex items-center justify-center gap-2 font-medium" title="Google">
              <FaGoogle className="text-xl" />
              <span className="text-sm">Google</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
            <span className="text-zinc-600 dark:text-gray-400 text-sm font-medium">{t("auth.signup.socialDivider") || "أو التسجيل بالبريد"}</span>
            <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-1"></div>
          </div>
        </div>

        {/* Section 3: Role Selection */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-4 text-center">{t("auth.signup.roleLabel") || "اختر نوع الحساب"}</label>
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => handleUserTypeChange("doctor")}
              className={`group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 min-w-40 ${
                form.userType === "doctor"
                  ? "bg-linear-to-br from-yellow-400 to-red-600 text-white shadow-xl shadow-yellow-500/30 ring-4 ring-yellow-400/30 scale-105"
                  : "bg-zinc-100 dark:bg-zinc-800 text-yellow-600 dark:text-yellow-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-600 hover:border-yellow-400 hover:scale-105"
              }`}
              title="Doctor"
            >
              <FaStethoscope className="text-4xl transition-transform group-hover:rotate-12" />
              <span className="text-lg font-bold">{t("auth.signup.doctorRole") || "طبيب"}</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleUserTypeChange("patient")}
              className={`group flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 min-w-40 ${
                form.userType === "patient"
                  ? "bg-linear-to-br from-yellow-400 to-red-600 text-white shadow-xl shadow-red-500/30 ring-4 ring-red-400/30 scale-105"
                  : "bg-zinc-100 dark:bg-zinc-800 text-red-600 dark:text-red-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-600 hover:border-red-400 hover:scale-105"
              }`}
              title="Patient"
            >
              <FaBed className="text-4xl transition-transform group-hover:rotate-12" />
              <span className="text-lg font-bold">{t("auth.signup.patientRole") || "مريض"}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Form Fields (55% height) - Scrollable */}
        <div className="h-[55%] px-6 py-4 overflow-y-auto space-y-3">

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{t("auth.signup.nameLabel") || "الاسم الكامل"} *</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 text-lg" />
              <input
                type="text"
                name="name"
                placeholder={locale === "en" ? "John Doe" : "أحمد محمد"}
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-yellow-400/30 dark:border-yellow-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
              />
            </div>
          </div>

          {/* Doctor License Number & Phone (only for doctors) */}
          {form.userType === "doctor" && (
            <>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{locale === "en" ? "Medical License Number" : "رقم الترخيص الطبي"} *</label>
                <div className="relative">
                  <FaStethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 text-lg" />
                  <input
                    type="text"
                    name="licenseNumber"
                    placeholder={locale === "en" ? "e.g. 123456" : "مثال: 123456"}
                    value={form.licenseNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-yellow-400/30 dark:border-yellow-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{locale === "en" ? "Phone Number" : "رقم الجوال"} *</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={locale === "en" ? "+9665xxxxxxx" : "05xxxxxxxx"}
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-yellow-400/30 dark:border-yellow-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{t("auth.signup.emailLabel") || "البريد الإلكتروني"} *</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 dark:text-red-400 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-400/30 dark:border-red-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-400/20 transition-all text-base"
              />
            </div>
          </div>

          {/* Doctor Selection for Patients */}
          {form.userType === "patient" && (
            <div>
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{t("auth.signup.doctorPickerLabel") || "الطبيب المعالج"} *</label>
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
                className="w-full px-4 py-4 border-2 border-amber-400/30 dark:border-amber-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 transition-all text-base"
              >
                <option value="">{t("auth.signup.doctorPlaceholder") || "اختر الطبيب المعالج"}</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{t("auth.signup.passwordLabel") || "كلمة المرور"} *</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-24 py-4 border-2 border-yellow-400/30 dark:border-yellow-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">{t("auth.signup.confirmPasswordLabel") || "تأكيد كلمة المرور"} *</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 dark:text-red-400 text-lg" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-400/30 dark:border-red-400/20 rounded-xl bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-400/20 transition-all text-base"
              />
            </div>
          </div>

          {/* شريط قوة كلمة المرور مع emoji */}
          {form.password && (
            <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-4 space-y-3 border-2 border-zinc-300 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-zinc-900 dark:text-white">{passwordStrengthLabel}</p>
                <span className="text-lg">
                  {(() => {
                    const checks = [passwordChecks.length, passwordChecks.uppercase, passwordChecks.number, passwordChecks.symbol].filter(Boolean).length;
                    if (checks <= 1) return "😞";
                    if (checks === 2) return "😐";
                    if (checks === 3) return "🙂";
                    return "😍";
                  })()}
                </span>
              </div>
              <div className="w-full h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${[passwordChecks.length, passwordChecks.uppercase, passwordChecks.number, passwordChecks.symbol].filter(Boolean).length * 25}%`,
                    backgroundColor: (() => {
                      const checks = [passwordChecks.length, passwordChecks.uppercase, passwordChecks.number, passwordChecks.symbol].filter(Boolean).length;
                      if (checks <= 1) return "#ef4444";
                      if (checks === 2) return "#eab308";
                      if (checks === 3) return "#f59e0b";
                      return "#22c55e";
                    })()
                  }}
                  className="h-3 rounded-full transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className={passwordChecks.length ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-500 dark:text-gray-500"}>
                  {passwordChecks.length ? "✔" : "✗"} {passwordHints[0] || "8 أحرف"}
                </span>
                <span className={passwordChecks.uppercase ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-500 dark:text-gray-500"}>
                  {passwordChecks.uppercase ? "✔" : "✗"} {passwordHints[1] || "حرف كبير"}
                </span>
                <span className={passwordChecks.number ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-500 dark:text-gray-500"}>
                  {passwordChecks.number ? "✔" : "✗"} {passwordHints[2] || "رقم"}
                </span>
                <span className={passwordChecks.symbol ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-zinc-500 dark:text-gray-500"}>
                  {passwordChecks.symbol ? "✔" : "✗"} {passwordHints[3] || "رمز خاص"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Messages & Submit Button */}
        <div className="border-t border-yellow-400/10 pt-6 space-y-4">
          {/* رسائل الأخطاء والنجاح */}
          {error && (
            <div className="w-full bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-500/50 rounded-xl p-3 text-red-700 dark:text-red-300 text-sm text-center font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="w-full bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-300 dark:border-emerald-500/50 rounded-xl p-3 text-emerald-700 dark:text-emerald-300 text-sm flex items-center justify-center gap-2 font-medium">
              <FaCheck className="text-base shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* زر الإنشاء */}
          <button
            type="submit"
            disabled={loading || !isPasswordStrong}
            className="w-full px-8 py-4 rounded-xl bg-linear-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white font-bold text-lg shadow-xl transition-all hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("auth.signup.loading") || "جاري الإنشاء..."}
              </>
            ) : (
              <>
                <FaUserPlus className="text-xl" />
                {t("auth.signup.submit") || "إنشاء حساب جديد"}
              </>
            )}
          </button>

          {/* رابط تسجيل الدخول */}
          <div className="text-center text-zinc-600 dark:text-gray-400 text-base">
            {haveAccountText}{" "}
            <Link href="/login" className="text-yellow-600 dark:text-yellow-400 hover:text-red-600 dark:hover:text-red-400 font-bold transition-colors underline">
              {loginText}
            </Link>
          </div>

          {/* روابط الخصوصية والشروط */}
          <div className="text-center text-zinc-600 dark:text-gray-400 text-sm mt-4">
            <p>
              {t("auth.signup.termsAgreement") || "أوافق على"}{" "}
              <Link href="/privacy" className="text-yellow-600 dark:text-yellow-400 hover:text-red-600 dark:hover:text-red-400 font-bold transition-colors underline">
                {t("auth.signup.privacyPolicy") || "سياسة الخصوصية"}
              </Link>
              {" "}{t("auth.signup.and") || "و"}{" "}
              <Link href="/terms" className="text-yellow-600 dark:text-yellow-400 hover:text-red-600 dark:hover:text-red-400 font-bold transition-colors underline">
                {t("auth.signup.termsConditions") || "شروط الاستخدام"}
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}





