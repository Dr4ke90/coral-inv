import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import { readAllTablets, addTablet } from "@/services/tabletService";

export async function GET() {
  try {
    await connectDB();

    const tablets = await readAllTablets();

    return NextResponse.json({ data: tablets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tablets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newEmployee = await addTablet(body);

    return NextResponse.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new tablet" },
      { status: 500 },
    );
  }
}
