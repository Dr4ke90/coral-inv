import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import {
  getHandoverDetails,
  updateHandoverDetails,
} from "@/services/handoverService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectDB();

    const data = await getHandoverDetails(id);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(`Error fetching handover ${error.message}`);

    const status = error.statusCode || 500;
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await connectDB();

    const body = await req.json();

    const updatedData = await updateHandoverDetails(id, body);

    return NextResponse.json({ data: updatedData });
  } catch (error: any) {
    console.error(`Update error for ID ${id}: ${error.message}`);

    const status = error.statusCode || 400;
    return NextResponse.json(
      { error: error.message || "Failed to update handover sheet" },
      { status },
    );
  }
}
