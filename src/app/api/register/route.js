import { hashPassword } from "@/lib/server/hashPassword";
import { connectToDatabase } from "@/lib/server/db";
import { NextResponse } from "next/server";

//==================================== GET ===========================================
export async function GET() {
  return NextResponse.json({
    name: "AHMEEEEED",
  });
}
//==================================== POST ===========================================
export async function POST(req) {
  try {
    // =========== Parse Request Body
    const { email, password } = await req.json();
    // =========== Validate Data
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid input - Password should be at least 7 characters long",
        },
        { status: 422 }
      );
    }
    // =========== hashPassword
    // const hashedPassword =  hashPassword(password);
    // =========== Connect to database
    const client = await connectToDatabase();
    const db = client.db("authAppDatabase");
    await db.collection("users").insertOne({
      email: email,
      password: password,
    });

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
