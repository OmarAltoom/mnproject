
import DoctorLayout from "../DoctorLayout";
import UploadXRayPageContent from "@/app/components/doctor/pages/UploadXRayPageContent";

export default function UploadXRayPage() {
  return (
    <DoctorLayout>
      <div className="p-8 bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <UploadXRayPageContent />
      </div>
    </DoctorLayout>
  );
}
