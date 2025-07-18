const sqlite3 = require('sqlite3').verbose()
const { open } = require('sqlite')
const path = require('path')

let db = null

async function getDb() {
  if (!db) {
    const dbPath = path.resolve(process.cwd(), 'crm.db')
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })
    
    // Initialize database with tables
    await initializeDatabase()
  }
  return db
}

async function initializeDatabase() {
  try {
    // Create customers table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        region TEXT,
        status TEXT DEFAULT 'active',
        segment TEXT DEFAULT 'Regular',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create orders table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        order_number TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'pending',
        total_amount REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      )
    `)

    // Create tickets table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER,
        subject TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'open',
        priority TEXT DEFAULT 'medium',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

module.exports = { getDb } 