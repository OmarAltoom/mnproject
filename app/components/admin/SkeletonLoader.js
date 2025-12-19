import React from "react";

export default function SkeletonLoader({ height = 20, width = '100%' }) {
  return (
    <div
      className="bg-gray-200 animate-pulse rounded"
      style={{ height, width }}
    />
  );
}
