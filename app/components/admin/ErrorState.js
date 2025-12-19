import React from "react";

export default function ErrorState({ message }) {
  return (
    <div className="text-center text-red-600 py-8">
      <p>{message || "حدث خطأ ما!"}</p>
    </div>
  );
}
