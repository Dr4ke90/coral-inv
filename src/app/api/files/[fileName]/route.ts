import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const allowedTemplates = ["requirement", "handover", "return"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileName: string }> },
) {
  const { fileName } = await params;

  if (!allowedTemplates.includes(fileName)) {
    return new NextResponse("Template not found or access denied", {
      status: 404,
    });
  }

  try {
    const filePath = path.join(process.cwd(), "src", "templates", fileName);

    const fileBuffer = await fs.readFile(`${filePath}.docx`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}.docx"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error);
    return new NextResponse("Error reading file on server", { status: 500 });
  }
}
