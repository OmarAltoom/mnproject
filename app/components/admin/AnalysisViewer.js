import Image from "next/image";

export default function AnalysisViewer({ imageUrl }) {
  if (!imageUrl) return <div className="text-center text-gray-400 py-4">لا توجد صورة للعرض.</div>;
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="relative w-full max-w-3xl h-96">
        <Image
          src={imageUrl}
          alt="صورة التحليل"
          fill
          sizes="(min-width: 1024px) 768px, 90vw"
          className="object-contain rounded-xl shadow"
        />
      </div>
      <span className="text-sm text-zinc-500">صورة التحليل</span>
    </div>
  );
}
