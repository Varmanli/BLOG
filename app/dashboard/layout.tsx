import Sidebar from "../-component/Sidebar";
import ThemeProvider from "../context/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-background text-gray-800 dark:text-gray-300">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
