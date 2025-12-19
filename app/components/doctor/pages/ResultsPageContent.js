"use client";

import React, { useState } from "react";
import ScansTable from "../../../doctor/components/ScansTable";
import ScanViewer from "../../../doctor/components/ScanViewer";

const mockScans = [
	{
		id: 101,
		date: "2025-12-01",
		type: "X-ray",
		aiSummary: "لا توجد علامات غير طبيعية واضحة.",
		comparisonAvailable: true,
		thumbnail: "/scan-xray-thumb.png",
		images: ["/scan-xray-1.png", "/scan-xray-2.png"],
		annotations: [
			{ text: "منطقة مشبوهة", position: "يمين أعلى" },
			{ text: "تكلسات بسيطة", position: "يسار أسفل" }
		]
	},
	{
		id: 102,
		date: "2025-11-28",
		type: "CT",
		aiSummary: "يوجد تضخم بسيط في الرئة اليمنى.",
		comparisonAvailable: false,
		thumbnail: "/scan-ct-thumb.png",
		images: ["/scan-ct-1.png"],
		annotations: []
	}
	// أضف المزيد حسب الحاجة
];

export default function ResultsPageContent() {
	const [selectedScan, setSelectedScan] = useState(null);
	const [viewerOpen, setViewerOpen] = useState(false);

	const handleView = (scan) => {
		setSelectedScan(scan);
		setViewerOpen(true);
	};
	const handleCloseViewer = () => {
		setViewerOpen(false);
		setSelectedScan(null);
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">سجل التحليلات الطبية</h1>
			<ScansTable
				scans={mockScans}
				onView={handleView}
				onCompare={() => {}}
				onAnnotate={() => {}}
			/>
			{viewerOpen && selectedScan && (
				<ScanViewer
					scan={selectedScan}
					images={selectedScan.images}
					annotations={selectedScan.annotations}
					onClose={handleCloseViewer}
				/>
			)}
		</div>
	);
}
