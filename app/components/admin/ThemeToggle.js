import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  return (
    <div className="flex items-center gap-3 my-6">
      <span className="font-bold">الوضع:</span>
      <button className={`px-4 py-2 rounded-full font-bold ${dark ? 'bg-zinc-800 text-white' : 'bg-yellow-200 text-yellow-700'}`} onClick={() => setDark(!dark)}>
        {dark ? "داكن" : "فاتح"}
      </button>
    </div>
  );
}
