
const LABELS = {
  en: {
    add: "Add Doctor",
    edit: "Edit Doctor",
    name: "Name",
    email: "Email",
    specialty: "Specialty",
    license: "License No.",
    phone: "Phone",
    status: "Status",
    save: "Save",
    cancel: "Cancel",
    pending: "Pending",
    verified: "Verified",
    rejected: "Rejected",
    select: "Select...",
  },
  ar: {
    add: "إضافة طبيب جديد",
    edit: "تعديل طبيب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    specialty: "التخصص",
    license: "رقم الترخيص",
    phone: "رقم الجوال",
    status: "الحالة",
    save: "حفظ",
    cancel: "إلغاء",
    pending: "قيد المراجعة",
    verified: "موثق",
    rejected: "مرفوض",
    select: "اختر...",
  },
};

function getLocale() {
  if (typeof window !== 'undefined') {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
  }
  return 'en';
}

export default function DoctorFormModal({ open, onClose, onSave, doctor }) {
  const [locale, setLocale] = useState('en');
  const [name, setName] = useState(doctor?.name || "");
  const [email, setEmail] = useState(doctor?.email || "");
  const [specialty, setSpecialty] = useState(doctor?.specialty || "أشعة");
  const [licenseNumber, setLicenseNumber] = useState(doctor?.licenseNumber || "");
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [status, setStatus] = useState(doctor?.status || "Pending");

  useEffect(() => {
    setLocale(getLocale());
  }, []);
  const t = LABELS[locale];
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl min-w-[400px] max-w-[500px] w-full flex flex-col gap-5 border border-gray-200 dark:border-zinc-800"
        onSubmit={e => {
          e.preventDefault();
          onSave({ name, email, specialty, licenseNumber, phone, status });
        }}
      >
        <h3 className="font-bold text-2xl mb-2 bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">{doctor ? t.edit : t.add}</h3>
        <input type="text" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder={t.name} value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder={t.license} value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} required />
        <input type="tel" className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" placeholder={t.phone} value={phone} onChange={e => setPhone(e.target.value)} required />
        <select className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" value={specialty} onChange={e => setSpecialty(e.target.value)}>
          <option value="أشعة">{locale === 'ar' ? 'أشعة' : 'Radiology'}</option>
          <option value="صدرية">{locale === 'ar' ? 'صدرية' : 'Pulmonology'}</option>
          <option value="عظام">{locale === 'ar' ? 'عظام' : 'Orthopedics'}</option>
        </select>
        <select className="border-2 border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Pending">{t.pending}</option>
          <option value="Verified">{t.verified}</option>
          <option value="Rejected">{t.rejected}</option>
        </select>
        <div className="flex gap-3 mt-4">
          <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02]">{t.save}</button>
          <button type="button" className="flex-1 px-6 py-3 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-all" onClick={onClose}>{t.cancel}</button>
        </div>
      </form>
    </div>
  );
}
