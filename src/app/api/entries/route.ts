import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as entryService from "@/services/entriesService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const entries = await entryService.readAllEntries();

    return NextResponse.json({ data: entries });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const entryData = JSON.parse(formData.get("entry") as string);
    const entryPDF = formData.get("pdf") as File | null;
    const itemsData = JSON.parse(formData.get("items") as string);

    let buffer: Buffer | undefined = undefined;
    if (entryPDF) {
      buffer = Buffer.from(await entryPDF.arrayBuffer());
    }

    const newEntry = await entryService.processEntryData({
      entryData,
      itemsData,
      buffer,
    });

    return NextResponse.json({ data: newEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new entry" },
      { status: 500 },
    );
  }
}
