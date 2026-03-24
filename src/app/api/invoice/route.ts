import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    let savedInvoice = null;

    if (file && year) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "uploads", "invoices", year);
      await mkdir(uploadDir, { recursive: true });

      const safeFileName = `${file.name.replaceAll(/\s+/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);

      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        data: {
          invoice: savedInvoice,
          file: {
            fileName: safeFileName,
            folder: `uploads/invoices/${year}`,
            size: file.size,
          },
        },
      });
    }

    return NextResponse.json(
      { error: "Nu a fost găsit niciun fișier valid." },
      { status: 400 },
    );
  } catch (error) {
    console.error("Eroare la procesarea cererii POST:", error);
    return NextResponse.json(
      { error: "Eroare internă server." },
      { status: 500 },
    );
  }
}
