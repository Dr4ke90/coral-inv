import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as returnService from "@/services/returnService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const returnSheets = await returnService.readAllReturnSheets();

    return NextResponse.json({ data: returnSheets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch return sheets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newReturn = await returnService.processReturn(body);

    return NextResponse.json({ data: newReturn });
  } catch (error: any) {
    console.error("Eroare severă la server:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.statusCode || 500 },
    );
  }
}
