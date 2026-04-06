import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import InternalComponentModel from "@/models/internalComponents.model";

export async function GET() {
  try {
    await connectDB();

    const employees = await InternalComponentModel.find({});

    return NextResponse.json({ data: employees });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch equipment" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID-ul este obligatoriu pentru procesarea cererii" },
        { status: 400 },
      );
    }

    const result = await InternalComponentModel.findOneAndUpdate(
      { id: id },
      {
        $set: { ...body, items: undefined },
        $addToSet: { items: { $each: body.items || [] } },
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({
      data: result,
      message: result.wasNew ? "Creat cu succes" : "Actualizat cu succes",
    });
  } catch (error: any) {
    console.error("Eroare la procesarea echipamentului:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Un echipament cu această serie există deja în baza de date" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Eroare internă la salvarea datelor" },
      { status: 500 },
    );
  }
}
