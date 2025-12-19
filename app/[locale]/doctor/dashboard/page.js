"use client";

import DoctorLayout from "../DoctorLayout";
import DashboardHome from "./DashboardHome";
import useLocale from "@/app/hooks/useLocale";

export default function DoctorDashboard() {
  const { locale } = useLocale();
  const basePrefix = locale === "en" ? "/en" : "/ar";
  const breadcrumbs = [{ label: locale === "en" ? "Home" : "الصفحة الرئيسية", href: `${basePrefix}/doctor/dashboard` }];

  return (
    <DoctorLayout breadcrumbs={breadcrumbs}>
      <DashboardHome />
    </DoctorLayout>
  );
}
