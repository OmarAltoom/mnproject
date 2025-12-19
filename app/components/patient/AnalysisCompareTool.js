"use client";

import Image from "next/image";
import { useState } from "react";

export default function AnalysisCompareTool({ leftImage, rightImage, comments }) {
  const [slider, setSlider] = useState(50);

  return (
    <section className="rounded-xl border border-gray-200 bg-white/70 shadow-sm">
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">أداة مقارنة الصور</h2>
      </header>
      <div className="p-4">
        <div className="relative mx-auto h-80 max-w-3xl overflow-hidden rounded-lg border border-gray-200 bg-black">
          {/* صورة اليسار */}
          {leftImage && (
            <Image
              src={leftImage}
              alt="left"
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-contain"
            />
          )}
          {/* صورة اليمين مع قصّ حسب السلايدر */}
          {rightImage && (
            <div className="absolute left-0 top-0 h-full" style={{ width: `${slider}%` }}>
              <div className="relative h-full w-full">
                <Image
                  src={rightImage}
                  alt="right"
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          )}
          {/* السلايدر */}
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setSlider(parseInt(e.target.value))}
            className="absolute bottom-2 left-1/2 w-1/2 -translate-x-1/2"
          />
        </div>
        {comments && (
          <div className="mt-4 rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-800">
            <div className="mb-1 text-gray-600">تعليقات الطبيب</div>
            <div>{comments}</div>
          </div>
        )}
        <div className="mt-3">
          <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">حفظ المقارنة</button>
        </div>
      </div>
    </section>
  );
}
