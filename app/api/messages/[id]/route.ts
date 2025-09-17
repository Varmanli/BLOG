import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "پیام با موفقیت حذف شد ✅" });
  } catch (err) {
    return NextResponse.json({ error: "خطا در حذف پیام" }, { status: 500 });
  }
}
