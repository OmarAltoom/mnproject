import React from "react";
import DashboardCard from "./DashboardCard";
import { FaUsers, FaUserMd, FaUserInjured, FaChartBar } from "react-icons/fa";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
      <DashboardCard icon={<FaUsers className="text-yellow-500" />} title="إجمالي المستخدمين" value={120} color="border-yellow-200" />
      <DashboardCard icon={<FaUserMd className="text-red-500" />} title="عدد الأطباء" value={35} color="border-red-200" />
      <DashboardCard icon={<FaUserInjured className="text-yellow-600" />} title="عدد المرضى" value={85} color="border-yellow-300" />
      <DashboardCard icon={<FaChartBar className="text-green-500" />} title="عدد التحليلات" value={230} color="border-green-200" />
    </div>
  );
}
