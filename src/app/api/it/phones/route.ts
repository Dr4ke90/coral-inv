import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import {
  addMobilePhone,
  readAllMobilePhones,
} from "@/services/mobilePhoneService";

export async function GET() {
  try {
    await connectDB();

    const mobilePhones = await readAllMobilePhones();

    return NextResponse.json({ data: mobilePhones });
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

    const newMobilePhone = await addMobilePhone(body);

    return NextResponse.json({ data: newMobilePhone });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new tablet" },
      { status: 500 },
    );
  }
}
