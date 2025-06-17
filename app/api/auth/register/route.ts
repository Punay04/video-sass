import { connectDb } from "@/lib/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    await connectDb();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return new Response("Email already exists", { status: 400 });
    }

    await userModel.create({
      name,
      email,
      password,
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Error creating user", { status: 500 });
  }
}
