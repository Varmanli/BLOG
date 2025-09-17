import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const errors: Record<string, string> = {};
    if (!name) errors.name = "نام و نام خانوادگی الزامی است";
    if (!email) errors.email = "ایمیل الزامی است";
    if (!message) errors.message = "متن پیام الزامی است";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await connectDB();
    await Message.create({ name, email, message });

    return NextResponse.json(
      { message: "پیام شما با موفقیت ثبت شد ✅" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "خطا در ذخیره پیام" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "خطا در دریافت پیام‌ها" },
      { status: 500 }
    );
  }
}
