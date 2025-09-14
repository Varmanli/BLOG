import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  // پیدا کردن ادمین
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { error: "ایمیل یا رمز اشتباه است" },
      { status: 401 }
    );
  }

  // بررسی پسورد hashed
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "ایمیل یا رمز اشتباه است" },
      { status: 401 }
    );
  }

  // ساخت JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d", // اعتبار 7 روزه
    }
  );

  const response = NextResponse.json({ message: "ورود موفق!" });

  // ذخیره توکن در HttpOnly Cookie
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 روز
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
