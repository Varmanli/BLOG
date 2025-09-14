import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../-component/Sidebar";
import ThemeProvider from "../context/ThemeProvider";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // اینجا سرور ساید چک می‌کنیم که توکن هست یا نه
  const token = cookies().get("token")?.value;

  if (!token) {
    // اگر توکن نبود → هدایت به لاگین
    redirect("/auth/login");
  }

  // اگر خواستی می‌تونی jwt.verify هم اینجا بکنی سرور ساید

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-background text-gray-800 dark:text-gray-300">
          {children}
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: {
            duration: 3000,
            iconTheme: { primary: "#4ade80", secondary: "#fff" },
          },
          error: {
            duration: 5000,
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
    </ThemeProvider>
  );
}
