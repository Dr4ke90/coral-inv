import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import { addEquipment, readAllEquipments } from "@/services/equipmentService";

export async function GET() {
  try {
    await connectDB();

    const equipment = await readAllEquipments();

    return NextResponse.json({ data: equipment });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch equipment" },
      { status: error.statusCode || 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const result = await addEquipment(body);

    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to create equipment" },
      { status: error.statusCode || 500 },
    );
  }
}
