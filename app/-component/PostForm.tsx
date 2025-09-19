"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import RichEditor from "./rich-editor";
import ImageProvider from "./context/ImageProvider";
import { uploadFile } from "@/app/actions/file";
import { IBlog } from "@/models/Blog";

interface Category {
  _id: string;
  name: string;
}

interface PostFormProps {
  post?: IBlog;
  mode: "create" | "edit";
}

export default function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
  }>({});

  // Load categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Populate form for edit mode
  useEffect(() => {
    if (mode === "edit" && post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setExistingCoverUrl(post.coverImage || null);
      setCoverPreview(null);
      setCoverFile(null);
      setSelectedCategory(post.category ? String(post.category) : "");
    } else {
      setTitle("");
      setContent("");
      setCoverFile(null);
      setCoverPreview(null);
      setExistingCoverUrl(null);
      setSelectedCategory("");
    }
  }, [mode, post]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setExistingCoverUrl(null);
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCoverUrl(null);
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string; category?: string } =
      {};

    if (!title.trim()) newErrors.title = "عنوان پست الزامی است";
    if (!content.trim() || content === "<p></p>")
      newErrors.content = "محتوای پست الزامی است";
    if (!selectedCategory) newErrors.category = "انتخاب دسته‌بندی الزامی است";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let coverUrl = existingCoverUrl;

      if (coverFile) {
        const formData = new FormData();
        formData.append("file", coverFile);
        const uploadResult = await uploadFile(formData);
        if (uploadResult?.secure_url) coverUrl = uploadResult.secure_url;
        else throw new Error("خطا در آپلود تصویر کاور");
      }

      const postData = {
        title: title.trim(),
        content,
        coverImage: coverUrl,
        author: "ناشناس",
        tags: post?.tags || [],
        category: selectedCategory,
      };

      let response;
      if (mode === "create") {
        response = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        response = await fetch(`/api/blogs/${post?._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "خطا در ذخیره پست");
      }

      toast.success(
        mode === "create"
          ? "پست با موفقیت ایجاد شد!"
          : "پست با موفقیت بروزرسانی شد!"
      );

      if (mode === "create") {
        setTitle("");
        setContent("");
        setCoverFile(null);
        setCoverPreview(null);
        setExistingCoverUrl(null);
        setSelectedCategory("");
      }

      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error(error instanceof Error ? error.message : "خطا در ذخیره پست");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageProvider>
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto p-10 space-y-6 
                   bg-white dark:bg-[#1E1E22] 
                   rounded-2xl shadow-sm border 
                   border-gray-200 dark:border-gray-700"
      >
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            عنوان پست
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.title
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
            }`}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            دسته‌بندی
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.category
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
            }`}
            disabled={isLoading}
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.category}
            </p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            تصویر کاور
          </label>
          <div className="mb-4">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              انتخاب تصویر کاور
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverChange}
                disabled={isLoading}
              />
            </label>
          </div>
          {(coverPreview || existingCoverUrl) && (
            <div className="relative w-full max-w-md">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <Image
                  src={coverPreview || existingCoverUrl || ""}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={removeCover}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">
              محتوای پست
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/dashboard/posts")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                disabled={isLoading}
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-accent text-black hover:bg-accent/80"
                }`}
              >
                {isLoading
                  ? "در حال ذخیره..."
                  : mode === "create"
                  ? "ایجاد پست"
                  : "بروزرسانی پست"}
              </button>
            </div>
          </div>

          <div
            className={`border rounded-lg ${
              errors.content
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <RichEditor value={content} onChange={setContent} />
          </div>

          {errors.content && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.content}
            </p>
          )}
        </div>
      </form>
    </ImageProvider>
  );
}
