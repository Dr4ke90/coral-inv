import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongo";
import { verifyToken } from "@/lib/auth";
import { readUserById } from "@/services/userService";

export async function GET() {
  await connectDB();

  const token = (await cookies()).get("session")?.value;
  if (!token)
    return NextResponse.json({ success: false, data: null }, { status: 401 });

  const decoded = await verifyToken(token);
  if (!decoded)
    return NextResponse.json({ success: false, data: null }, { status: 401 });

  const user = await readUserById(decoded.id);
  if (!user)
    return NextResponse.json({ success: false, data: null }, { status: 404 });

  return NextResponse.json({ success: true, data: user });
}
