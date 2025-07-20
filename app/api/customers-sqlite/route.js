
import { NextResponse } from "next/server";

// Disable SQLite API in production (Vercel)
const { getDb } = require("@/lib/sqlite");

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({
      error: "SQLite API is disabled in production. Use MongoDB API routes instead.",
      customers: [],
    }, { status: 501 });
  }
  try {
    console.log("Getting customers from SQLite...");
    const db = await getDb();
    const customers = await db.all('SELECT * FROM customers ORDER BY created_at DESC');
    console.log(`Found ${customers?.length || 0} customers`);
    return NextResponse.json({
      success: true,
      customers: customers || [],
    });
  } catch (error) {
    console.error("Get customers error:", error);
    return NextResponse.json({ 
      success: true, 
      customers: [] 
    });
  }
}

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({
      error: "SQLite API is disabled in production. Use MongoDB API routes instead.",
    }, { status: 501 });
  }
  try {
    const { name, email, phone, region } = await request.json();
    console.log("Creating customer:", { name, email, phone, region });
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const db = await getDb();
    // Check if customer already exists
    const existingCustomer = await db.get('SELECT * FROM customers WHERE email = ?', [email]);
    if (existingCustomer) {
      return NextResponse.json({ error: "Customer already exists with this email" }, { status: 400 });
    }
    const customerData = {
      name,
      email,
      phone: phone || "",
      region: region || "",
      status: "active",
      segment: "New",
    };
    const result = await db.run(`
      INSERT INTO customers (name, email, phone, region, status, segment)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      customerData.name,
      customerData.email,
      customerData.phone,
      customerData.region,
      customerData.status,
      customerData.segment,
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create customer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log("Getting customers from SQLite...")
    
    const db = await getDb()
    
    const customers = await db.all('SELECT * FROM customers ORDER BY created_at DESC')
    
    console.log(`Found ${customers?.length || 0} customers`)
    
    return NextResponse.json({
      success: true,
      customers: customers || [],
    })
  } catch (error) {
    console.error("Get customers error:", error)
    return NextResponse.json({ 
      success: true, 
      customers: [] 
    })
  }
}

export async function POST(request) {
  try {
    const { name, email, phone, region } = await request.json()
    console.log("Creating customer:", { name, email, phone, region })

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const db = await getDb()

    // Check if customer already exists
    const existingCustomer = await db.get('SELECT * FROM customers WHERE email = ?', [email])
    if (existingCustomer) {
      return NextResponse.json({ error: "Customer already exists with this email" }, { status: 400 })
    }

    const customerData = {
      name,
      email,
      phone: phone || "",
      region: region || "",
      status: "active",
      segment: "New",
    }

    const result = await db.run(`
      INSERT INTO customers (name, email, phone, region, status, segment)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      customerData.name,
      customerData.email,
      customerData.phone,
      customerData.region,
      customerData.status,
      customerData.segment,
    ])

    const newCustomer = {
      id: result.lastID,
      ...customerData,
      created_at: new Date().toISOString(),
    }

    console.log("Customer created successfully:", newCustomer.id)
    return NextResponse.json({
      success: true,
      customer: newCustomer,
    })
  } catch (error) {
    console.error("Create customer error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 