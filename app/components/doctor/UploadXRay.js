"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function UploadXRay() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };
  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };
  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <section className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow p-6 mt-4 flex flex-col items-center">
      <h3 className="text-lg font-bold mb-4 text-black dark:text-zinc-50">Upload X-Ray</h3>
      <div
        className="w-full max-w-xs h-40 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded flex items-center justify-center mb-4 cursor-pointer bg-zinc-50 dark:bg-zinc-800"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current.click()}
      >
        {preview ? (
          <Image src={preview} alt="Preview" width={144} height={144} className="h-36 object-contain" />
        ) : (
          <span className="text-zinc-400">Drag & Drop or Click to Upload</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </section>
  );
}
