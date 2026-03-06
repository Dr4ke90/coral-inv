import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import HandoverSheetModel from "@/lib/db/models/handoversSheet.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const handoverSheets = await HandoverSheetModel.find({});

    return NextResponse.json({ data: handoverSheets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch handover sheets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newhandover = await HandoverSheetModel.create(body);

    return NextResponse.json({ data: newhandover });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create handover sheet" },
      { status: 500 },
    );
  }
}
