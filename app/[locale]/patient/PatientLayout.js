import SidebarNavigation from "../components/patient/SidebarNavigation";

export default function PatientLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-black">
      <SidebarNavigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}
