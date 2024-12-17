import Link from "next/link";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const dummyPosts = [
  { id: 1, title: "آشنایی با جاوااسکریپت", date: "2024-04-01" },
  { id: 2, title: "راهنمای شروع Node.js", date: "2024-04-10" },
  { id: 3, title: "چگونه React را یاد بگیریم؟", date: "2024-04-15" },
];

export default function ManagePostsPage() {
  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary dark:text-yellow-400">
          مدیریت بلاگ‌ها
        </h1>
        <Link href="/dashboard/posts/create">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition">
            <FaPlus /> افزودن بلاگ جدید
          </button>
        </Link>
      </div>

      {/* جدول لیست بلاگ‌ها */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="p-3 text-right">عنوان</th>
              <th className="p-3 text-right">تاریخ</th>
              <th className="p-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {dummyPosts.map((post) => (
              <tr
                key={post.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.date}</td>
                <td className="p-3 flex justify-center gap-4">
                  <Link href={`/dashboard/posts/edit/${post.id}`}>
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={18} />
                    </button>
                  </Link>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
