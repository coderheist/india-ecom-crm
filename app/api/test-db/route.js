import { NextResponse } from "next/server"
const { getDb } = require("@/lib/sqlite")

export async function GET() {
  try {
    console.log("Testing database connection...")
    
    const db = await getDb()
    
    // Test query to check if tables exist
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'")
    console.log("Available tables:", tables)
    
    // Test customers table
    const customers = await db.all("SELECT * FROM customers LIMIT 5")
    console.log("Customers in database:", customers)
    
    return NextResponse.json({
      success: true,
      tables: tables.map(t => t.name),
      customerCount: customers.length,
      customers: customers
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    })
  }
} 