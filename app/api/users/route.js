import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET: List all users
export async function GET() {
  try {
    const client = await clientPromise;
    const mongoClient = await client;
    const db = mongoClient.db("ecommerce_crm");
    const users = db.collection("users");
    const allUsers = await users.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, users: allUsers });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Add a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role } = body;
    if (!name || !email || !role) {
      return NextResponse.json({ error: "Name, email, and role are required." }, { status: 400 });
    }
    const client = await clientPromise;
    const mongoClient = await client;
    const db = mongoClient.db("ecommerce_crm");
    const users = db.collection("users");
    // Check for duplicate email
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "A user with this email already exists." }, { status: 400 });
    }
    const createdAt = new Date();
    const user = {
      name,
      email,
      phone: phone || "",
      role,
      status: "active",
      lastLogin: "-",
      createdAt,
      permissions: ["dashboard"],
    };
    const result = await users.insertOne(user);
    return NextResponse.json({ success: true, user: { ...user, _id: result.insertedId } });
  } catch (error) {
    console.error("Add user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 