"use client";
import { useRouter } from "next/navigation";

export default function LogoutSidebarItem() {
  const router = useRouter();
  
  const handleLogout = () => {
    // Clear auth data
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    // Navigate to home page
    router.replace("/ar");
  };

  return (
    <button onClick={handleLogout} className="py-2 px-4 rounded text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 font-medium block w-full text-right">
      Logout
    </button>
  );
}
