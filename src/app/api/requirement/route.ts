import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import RequirementSheetModel from "@/features/requirement/models/requirementModel";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const requirements = await RequirementSheetModel.find({});

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

    const newRequirement = await RequirementSheetModel.create(body);

    return NextResponse.json({ data: newRequirement });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create requirement" },
      { status: 500 },
    );
  }
}
