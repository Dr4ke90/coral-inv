import InvoiceModel from "@/lib/db/models/invoice.model";
import connectDB from "@/lib/db/mongo";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // ==========================================
    // CAZUL 1: REQUEST MULTIPART (poate conține DOAR fișier SAU fișier + date)
    // ==========================================
    if (contentType.includes("multipart/form-data")) {
      const { searchParams } = new URL(request.url);
      const year = searchParams.get("year");
      const formData = await request.formData();

      const file = formData.get("file") as File | null;
      const invoiceDataString = formData.get("invoiceData") as string | null;

      let savedInvoice = null;

      if (invoiceDataString) {
        try {
          const parsedData = JSON.parse(invoiceDataString);
          await connectDB();
          const newInvoice = new InvoiceModel(parsedData);
          savedInvoice = await newInvoice.save();
        } catch (dbError) {
          console.error("Eroare la salvarea în MongoDB:", dbError);
          return NextResponse.json(
            {
              error:
                "Eroare la baza de date. Fișierul nu a fost încărcat pentru a preveni inconsistențele.",
            },
            { status: 500 },
          );
        }
      }

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
    }

    // ==========================================
    // CAZUL 2: DOAR SALVARE DATE FACTURĂ (fără fișier, din request pur JSON)
    // ==========================================
    if (contentType.includes("application/json")) {
      const body = await request.json();
      await connectDB();
      const newInvoice = new InvoiceModel(body);
      const savedInvoice = await newInvoice.save();

      return NextResponse.json(
        { success: true, data: savedInvoice },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { error: "Tip de conținut nesuportat." },
      { status: 415 },
    );
  } catch (error) {
    console.error("Eroare la procesarea cererii POST:", error);
    return NextResponse.json(
      { error: "Eroare internă server." },
      { status: 500 },
    );
  }
}
