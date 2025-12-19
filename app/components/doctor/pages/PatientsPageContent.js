"use client";
import React, { useState } from "react";
import PatientsTable from "../../../doctor/components/PatientsTable";
import PatientQuickViewModal from "../../../doctor/components/PatientQuickViewModal";
import PatientFilters from "../PatientFilters";
import PatientSearchBar from "../../../doctor/components/PatientSearchBar";
import Pagination from "../Pagination";

const mockPatients = [
	{
		id: 1,
		name: "محمد علي",
		age: 35,
		status: "مستقر",
		lastScanDate: "2025-11-28",
		profileImage: "/default-patient.png",
		medicalHistory: "لا يوجد أمراض مزمنة",
	},
	{
		id: 2,
		name: "سارة يوسف",
		age: 29,
		status: "حرج",
		lastScanDate: "2025-12-01",
		profileImage: "/default-patient.png",
		medicalHistory: "سكري، ضغط دم",
	},
	// أضف المزيد حسب الحاجة
];

export default function PatientsPageContent() {
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [quickViewOpen, setQuickViewOpen] = useState(false);

	// تصفية المرضى حسب البحث والفلاتر
	const filteredPatients = mockPatients.filter((p) => {
		const matchesSearch = p.name.includes(search);
		const matchesName = !filters.name || p.name.includes(filters.name);
		const matchesAge = !filters.age || p.age === Number(filters.age);
		const matchesStatus = !filters.status || p.status === filters.status;
		return matchesSearch && matchesName && matchesAge && matchesStatus;
	});

	// تقسيم الصفحات
	const pageSize = 10;
	const totalPages = Math.ceil(filteredPatients.length / pageSize);
	const paginatedPatients = filteredPatients.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	const handleView = (patient) => {
		setSelectedPatient(patient);
		setQuickViewOpen(true);
	};
	const handleCloseQuickView = () => {
		setQuickViewOpen(false);
		setSelectedPatient(null);
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">قائمة المرضى</h1>
			<div className="flex gap-2 items-center">
				<PatientSearchBar value={search} onChange={setSearch} />
				<PatientFilters filters={filters} onChange={setFilters} />
			</div>
			<PatientsTable
				patients={paginatedPatients}
				onView={handleView}
				onChat={() => {}}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
			<PatientQuickViewModal
				patient={selectedPatient}
				open={quickViewOpen}
				onClose={handleCloseQuickView}
			/>
		</div>
	);
}
