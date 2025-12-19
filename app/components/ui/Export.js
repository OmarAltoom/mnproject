"use client";
import React from "react";
import { FaDownload } from "react-icons/fa";

export const exportToCSV = (data, filename = "export") => {
  if (!data || data.length === 0) {
    alert("لا توجد بيانات للتصدير");
    return;
  }

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`;
        }
        return value;
      }).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (data, filename = "export") => {
  if (!data || data.length === 0) {
    alert("لا توجد بيانات للتصدير");
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// مكون Export Button
const ExportButton = ({ data, filename = "export", format = "csv" }) => {
  const handleExport = () => {
    if (format === "csv") {
      exportToCSV(data, filename);
    } else if (format === "json") {
      exportToJSON(data, filename);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
    >
      <FaDownload size={14} />
      تنزيل {format.toUpperCase()}
    </button>
  );
};

export default ExportButton;
