import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as projectService from "@/services/projectService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const projects = await projectService.readAllProjects();

    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newProject = await projectService.addProject(body);

    return NextResponse.json({ data: newProject });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new project" },
      { status: 500 },
    );
  }
}
