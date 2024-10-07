import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const fileName = url.searchParams.get("file");

  if (!fileName) {
    return new NextResponse("File name is required", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "downloads", fileName);

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
