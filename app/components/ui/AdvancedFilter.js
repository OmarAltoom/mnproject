"use client";
import React, { useState } from "react";
import { FaSlidersH, FaTimes } from "react-icons/fa";

const AdvancedFilter = ({ fields = [], onApply = () => {}, onReset = () => {} }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});

  const handleChange = (fieldName, value) => {
    setFilters((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    setShowFilter(false);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
  };

  const activeFilters = Object.values(filters).filter((v) => v !== "" && v !== null).length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition ${
          showFilter || activeFilters > 0
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
        }`}
      >
        <FaSlidersH size={14} />
        الفلاتر {activeFilters > 0 && `(${activeFilters})`}
      </button>

      {showFilter && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 z-50 w-80 border border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">الفلاتر المتقدمة</h3>
            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>

                {field.type === "select" && (
                  <select
                    value={filters[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg"
                  >
                    <option value="">الكل</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    value={filters[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg"
                  />
                )}

                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder || ""}
                    value={filters[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg"
                  />
                )}

                {field.type === "range" && (
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={filters[field.name] || field.min}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              تطبيق
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500 text-gray-900 dark:text-white rounded-lg transition"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;
