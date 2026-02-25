import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/userModel";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  await connectDB();

  const { username, password } = await request.json();
  const user = await User.findOne({ username, password });
  if (!user)
    return NextResponse.json(
      { success: false, error: "Login invalid" },
      { status: 401 },
    );

  const token = await signToken({ id: user._id.toString() });

  const response = NextResponse.json({ success: true, data: user });
  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
