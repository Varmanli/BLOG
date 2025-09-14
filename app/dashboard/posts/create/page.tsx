"use client";
import RichEditor from "@/app/-component/rich-editor";
import ImageProvider from "@/app/-component/context/ImageProvider";
import { useState } from "react";

export default function CreatePostPage() {
  const [content, setContent] = useState("");

  const handleSave = async () => {
    console.log("Post content:", content);

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "عنوان تست", content }),
    });
  };

  return (
    <ImageProvider>
      <div className="p-6">
        <input placeholder="عنوان پست" className="border p-2 mb-4 w-full" />
        <RichEditor value={content} onChange={setContent} />
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          ذخیره پست
        </button>
      </div>
    </ImageProvider>
  );
}
