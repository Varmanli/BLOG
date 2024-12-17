import Sidebar from "../-component/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
        {children}
      </main>
    </div>
  );
}
