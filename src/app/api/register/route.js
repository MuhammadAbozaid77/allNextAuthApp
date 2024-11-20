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

    //----------Check Email In Databse-----------
    const checkEmailInDatabse = await db.collection("users").findOne({
      email: email,
    });
    if (checkEmailInDatabse) {
      client.close();
      return NextResponse.json(
        { message: "Email Is Already Token" },
        { status: 422 }
      );
    }
    //-----------Add To Database-----------
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
