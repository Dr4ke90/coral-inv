import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import { getHandoversList, processHandover } from "@/services/handoverService";

export async function GET() {
  try {
    await connectDB();

    const data = await getHandoversList();

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("GET Handover Sheets Error:", error);
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

    const result = await processHandover(body);

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    console.error("Handover Error:", error.message);

    const status = error.message.includes("nu a fost găsit") ? 404 : 400;

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status },
    );
  }
}
