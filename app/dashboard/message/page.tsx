"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => toast.error("خطا در دریافت پیام‌ها"))
      .finally(() => setLoadingMessages(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید می‌خواهید این پیام را حذف کنید؟")) return;

    setLoadingIds((prev) => [...prev, id]);

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.error || "حذف پیام موفقیت‌آمیز نبود.");
        return;
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success(resData.message);
    } catch {
      toast.error("خطا در حذف پیام");
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  if (loadingMessages)
    return (
      <p className="text-gray-700 dark:text-gray-300">در حال بارگذاری...</p>
    );

  if (!messages || messages.length === 0)
    return (
      <p className="text-gray-700 dark:text-gray-300">هیچ پیامی وجود ندارد.</p>
    );

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="border rounded-lg p-6 shadow hover:shadow-lg transition flex justify-between items-start gap-4 bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {msg.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{msg.email}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {msg.message}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(msg._id)}
            disabled={loadingIds.includes(msg._id)}
            className={`bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 transition flex items-center justify-center ${
              loadingIds.includes(msg._id)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {loadingIds.includes(msg._id) ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      ))}
    </div>
  );
}
