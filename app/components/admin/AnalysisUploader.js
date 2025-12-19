import { useRef } from "react";

export default function AnalysisUploader({ onUpload }) {
  const fileRef = useRef();
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={e => onUpload(e.target.files[0])} />
      <button className="px-6 py-2 bg-yellow-500 text-white rounded" onClick={() => fileRef.current.click()}>رفع صورة تحليل</button>
    </div>
  );
}
