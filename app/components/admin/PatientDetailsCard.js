export default function PatientDetailsCard({ patient, onClose }) {
  if (!patient) return null;
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-100 max-w-md mx-auto mt-8">
      <h3 className="font-bold text-xl mb-4 text-yellow-700">تفاصيل المريض</h3>
      <div className="mb-2"><span className="font-bold">الاسم:</span> {patient.name}</div>
      <div className="mb-2"><span className="font-bold">العمر:</span> {patient.age}</div>
      <div className="mb-2"><span className="font-bold">البريد الإلكتروني:</span> {patient.email}</div>
      <button className="mt-6 px-6 py-2 rounded-full bg-yellow-400 text-white font-bold" onClick={onClose}>إغلاق</button>
    </div>
  );
}
