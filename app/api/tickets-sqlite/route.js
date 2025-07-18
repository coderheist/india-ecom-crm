import { NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/sqlite"

export async function GET() {
  try {
    console.log("Getting tickets from SQLite...")
    
    initDatabase()
    const db = getDatabase()
    
    const tickets = db.prepare('SELECT * FROM tickets ORDER BY created_at DESC').all()
    
    console.log(`Found ${tickets.length} tickets`)
    
    return NextResponse.json({
      success: true,
      tickets: tickets,
    })
  } catch (error) {
    console.error("Get tickets error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { customerId, customerName, customerEmail, subject, description, priority } = await request.json()
    console.log("Creating ticket:", { customerId, customerName, subject })

    if (!customerId || !customerName || !subject || !description) {
      return NextResponse.json({ error: "Customer ID, name, subject, and description are required" }, { status: 400 })
    }

    initDatabase()
    const db = getDatabase()

    // Generate ticket ID
    const ticketCount = db.prepare('SELECT COUNT(*) as count FROM tickets').get()
    const ticketId = `TKT-${new Date().getFullYear()}-${String(ticketCount.count + 1).padStart(3, "0")}`

    const ticketData = {
      ticketId,
      customerId,
      customerName,
      customerEmail: customerEmail || "",
      subject,
      description,
      priority: priority || "medium",
      status: "open",
      assignedTo: null,
    }

    const stmt = db.prepare(`
      INSERT INTO tickets (ticketId, customerId, customerName, customerEmail, subject, description, priority, status, assignedTo, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `)
    
    const result = stmt.run(
      ticketData.ticketId,
      ticketData.customerId,
      ticketData.customerName,
      ticketData.customerEmail,
      ticketData.subject,
      ticketData.description,
      ticketData.priority,
      ticketData.status,
      ticketData.assignedTo
    )

    const newTicket = {
      id: result.lastInsertRowid,
      ...ticketData
    }

    console.log("Ticket created successfully:", newTicket.ticketId)
    return NextResponse.json({
      success: true,
      ticket: newTicket,
    })
  } catch (error) {
    console.error("Create ticket error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 