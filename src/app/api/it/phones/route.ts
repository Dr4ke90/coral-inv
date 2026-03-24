import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import MobilePhoneModel from "@/lib/db/models/mobilePhone.model";

export async function GET() {
  try {
    await connectDB();

    const employees = await MobilePhoneModel.find({});

    return NextResponse.json({ data: employees });
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

    const newEmployee = await MobilePhoneModel.create(body);

    return NextResponse.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new tablet" },
      { status: 500 },
    );
  }
}
