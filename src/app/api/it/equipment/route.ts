import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import EquipmentModel from "@/lib/db/models/equipment.model";

export async function GET() {
  try {
    await connectDB();

    const employees = await EquipmentModel.find({});

    return NextResponse.json({ data: employees });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newEmployee = await EquipmentModel.create(body);

    return NextResponse.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new employee" },
      { status: 500 },
    );
  }
}
