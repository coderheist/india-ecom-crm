import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    console.log("Signup request received")
    
    const { name, email, password, role = "viewer" } = await request.json()
    console.log("Request data:", { name, email, role })

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    console.log("MongoDB connected successfully")
    
    const db = client.db("ecommerce_crm")
    const users = db.collection("users")

    // Check if user already exists
    console.log("Checking for existing user...")
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    console.log("Hashing password...")
    const hashedPassword = await hashPassword(password)

    // Create user
    console.log("Creating user...")
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      status: "active",
      createdAt: new Date(),
      lastLogin: null,
    })

    // Generate token
    console.log("Generating token...")
    const token = generateToken(result.insertedId.toString(), email, role)

    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      role,
    }

    console.log("User created successfully:", user.id)
    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    console.error("Signup error details:", error.message)
    console.error("Signup error stack:", error.stack)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
