"use client";

import React, { useState } from "react";
import AppointmentsCalendar from "../../../doctor/components/AppointmentsCalendar";

const mockAppointments = [
	{
		id: 1,
		patient: "محمد علي",
		date: "2025-12-02",
		time: "09:00",
		status: "مجدول",
	},
	{
		id: 2,
		patient: "سارة يوسف",
		date: "2025-12-03",
		time: "11:30",
		status: "مؤكد",
	},
	// أضف المزيد حسب الحاجة
];

export default function AppointmentsPageContent() {
	const [appointments, setAppointments] = useState(mockAppointments);
	const [filters, setFilters] = useState({});

	const handleAdd = (newAppointment) => {
		setAppointments([
			...appointments,
			{ ...newAppointment, id: appointments.length + 1 },
		]);
	};
	const handleEdit = (updatedAppointment) => {
		setAppointments(
			appointments.map((a) =>
				a.id === updatedAppointment.id ? updatedAppointment : a
			)
		);
	};

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">المواعيد</h1>
			<AppointmentsCalendar
				appointments={appointments}
				onAdd={handleAdd}
				onEdit={handleEdit}
				filters={filters}
				onFilterChange={setFilters}
			/>
		</div>
	);
}
