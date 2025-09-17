"use client";

import { useEffect } from "react";

export default function BlogViewTracker({ blogId }: { blogId: string }) {
  useEffect(() => {
    const increaseView = async () => {
      try {
        await fetch(`/api/blogs/${blogId}`, {
          method: "PATCH",
        });
      } catch (error) {
        console.error("خطا در افزایش ویو:", error);
      }
    };

    increaseView();
  }, [blogId]);

  return null;
}
