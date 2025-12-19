"use client";
import React from "react";
import AnalyticsCard from "../../../doctor/components/AnalyticsCard";
import AnalyticsChart from "../../../doctor/components/AnalyticsChart";
import AnalyticsSummary from "../../../doctor/components/AnalyticsSummary";
import { FaUserInjured, FaXRay, FaTasks } from "react-icons/fa";

const stats = [
	{ label: "عدد المرضى هذا الأسبوع", value: 24 },
	{ label: "عدد الفحوصات المراجعة", value: 18 },
	{ label: "المهام المعلقة", value: 3 },
];

const chartData = {
	labels: [
		"الأحد",
		"الإثنين",
		"الثلاثاء",
		"الأربعاء",
		"الخميس",
		"الجمعة",
		"السبت",
	],
	datasets: [
		{
			label: "عدد المرضى",
			data: [3, 5, 4, 2, 6, 2, 2],
			backgroundColor: "#38bdf8",
		},
	],
};

export default function AnalyticsPageContent() {
	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">إحصائيات الطبيب</h1>
			<div className="flex gap-4">
				<AnalyticsCard
					title="المرضى"
					value={24}
					icon={<FaUserInjured />}
					accent="#38bdf8"
				/>
				<AnalyticsCard
					title="الفحوصات"
					value={18}
					icon={<FaXRay />}
					accent="#f59e42"
				/>
				<AnalyticsCard
					title="المهام"
					value={3}
					icon={<FaTasks />}
					accent="#f43f5e"
				/>
			</div>
			<AnalyticsSummary stats={stats} />
			<div className="max-w-xl">
				<AnalyticsChart
					type="bar"
					data={chartData}
					options={{ responsive: true }}
				/>
			</div>
		</div>
	);
}
