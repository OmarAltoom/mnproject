import React from "react";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="mb-4" aria-label="breadcrumb">
      <ol className="flex space-x-2 text-sm text-gray-500">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {item}
            {idx < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
