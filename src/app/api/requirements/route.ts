import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as requirementRepo from "@/repository/requirementRepo";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const requirements = await requirementRepo.getAllRequirements();

    return NextResponse.json({ data: requirements });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch requirements" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const [newRequirement] = await requirementRepo.createRequirement(body);

    return NextResponse.json({ data: newRequirement });
  } catch (error) {
    console.error("Eroare severă la server:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
