import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }); // آخرین پست‌ها اول
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "مشکل در گرفتن بلاگ‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body: Partial<IBlog> = await req.json();

    if (!body.title) {
      return NextResponse.json({ error: "title الزامی است" }, { status: 400 });
    }

    const blog = await Blog.create({ ...body, slug: body.title });

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "مشکل در ایجاد بلاگ" }, { status: 500 });
  }
}
