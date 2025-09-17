import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import Link from "next/link";

async function getMessages() {
  await connectDB();
  return await Message.find().sort({ createdAt: -1 }).lean();
}

export default async function MessagesDashboard() {
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-300">هیچ پیامی وجود ندارد.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <div
          key={String(msg._id)}
          className="border rounded-lg p-4 shadow hover:shadow-md transition flex justify-between items-start gap-4"
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
          <form
            method="post"
            action={`/api/messages/${msg._id}?_method=DELETE`}
          >
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 transition"
            >
              حذف
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
