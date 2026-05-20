import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as usersService from "@/services/usersService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const users = await usersService.readAllUsers();

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newUser = await usersService.addUser(body);

    return NextResponse.json({ data: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new user" },
      { status: 500 },
    );
  }
}
