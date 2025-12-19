import Image from "next/image";

export default function TopBar() {
  return (
    <header className="w-full flex items-center justify-between bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3">
      <div className="flex items-center gap-3">
        <Image src="/next.svg" alt="Doctor" width={36} height={36} className="rounded-full" style={{width: '100%', height: 'auto'}} />
        <span className="font-bold text-lg text-black dark:text-zinc-50">Dr. Ahmed Ali</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          <svg width="24" height="24" fill="none" stroke="currentColor" className="text-zinc-600 dark:text-zinc-300"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path d="M12 8v4l2 2" strokeWidth="2"/></svg>
        </button>
        <button className="hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded">
          <svg width="24" height="24" fill="none" stroke="currentColor" className="text-zinc-600 dark:text-zinc-300"><circle cx="12" cy="12" r="10" strokeWidth="2"/><path d="M12 16v-4" strokeWidth="2"/></svg>
        </button>
      </div>
    </header>
  );
}
