import { hashPassword } from "@/lib/server/hashPassword";
import { connectToDatabase } from "@/lib/server/db";
import { NextResponse } from "next/server";

//=======================================================
// export async function POST(req, res) {
//   // Request Validate  ========================================================
//   if (req?.method !== "POST") {
//     console.log("Not Post");
//     return;
//   }
//   // Data  ========================================================
//   const data = req?.body;
//   const { email, password } = data;

//   // Validation Before Connection  ========================================================
//   if (
//     !email ||
//     !email.includes("@") ||
//     !password ||
//     password.trim().length < 7
//   ) {
//     res.status(422).json({
//       message: "Inavlid Input - Password Should Also Be 7 characters",
//     });
//     return;
//   }
//   // hashPassword  ========================================================
//   const hashedPassword = hashPassword(password);

//   // Connect To Database ========================================================
//   const client = await connectToDatabase();
//   const db = client.db();
//   const result = await db.collection("users").insertOne({
//     email: email,
//     password: hashedPassword,
//   });

//   res.status(201).json({ message: "Created  User !" });
// }

//  ======================================= Get Method =======================================
export async function GET() {
  return NextResponse.json({
    name: "AHMEEEEED",
  });
}

export async function POST(req) {
  try {
    // Parse request body
    const { email, password } = await req.json();
    console.log(email, password);

    // Validate data
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

    // Hash password
    // const hashedPassword = await hashPassword(password);
    // console.log("hashedPassword", hashedPassword);

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection("users").insertOne({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
