import { NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/sqlite"

export async function GET() {
  try {
    console.log("Getting orders from SQLite...")
    
    initDatabase()
    const db = getDatabase()
    
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all()
    
    console.log(`Found ${orders.length} orders`)
    
    return NextResponse.json({
      success: true,
      orders: orders,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { customerId, customerName, customerEmail, items, total, paymentMethod, shippingAddress } =
      await request.json()
    console.log("Creating order:", { customerId, customerName, total })

    if (!customerId || !customerName || !total) {
      return NextResponse.json({ error: "Customer ID, name, and total are required" }, { status: 400 })
    }

    initDatabase()
    const db = getDatabase()

    // Generate order ID
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get()
    const orderId = `ORD-${new Date().getFullYear()}-${String(orderCount.count + 1).padStart(3, "0")}`

    const orderData = {
      orderId,
      customerId,
      customerName,
      customerEmail: customerEmail || "",
      date: new Date().toISOString().split("T")[0],
      status: "new",
      total,
      items: items || 1,
      paymentMethod: paymentMethod || "UPI",
      shippingAddress: shippingAddress || "",
      trackingId: null,
    }

    const stmt = db.prepare(`
      INSERT INTO orders (orderId, customerId, customerName, customerEmail, date, status, total, items, paymentMethod, shippingAddress, trackingId, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `)
    
    const result = stmt.run(
      orderData.orderId,
      orderData.customerId,
      orderData.customerName,
      orderData.customerEmail,
      orderData.date,
      orderData.status,
      orderData.total,
      orderData.items,
      orderData.paymentMethod,
      orderData.shippingAddress,
      orderData.trackingId
    )

    const newOrder = {
      id: result.lastInsertRowid,
      ...orderData
    }

    console.log("Order created successfully:", newOrder.orderId)
    return NextResponse.json({
      success: true,
      order: newOrder,
    })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 