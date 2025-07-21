import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/crm_heist_dev"
const options = {}

console.log("MongoDB URI:", uri ? "Set" : "Not set")
console.log("NODE_ENV:", process.env.NODE_ENV)

// Validate MongoDB URI
if (!uri || typeof uri !== 'string' || uri.trim() === '') {
  throw new Error('MongoDB URI is not defined or invalid. Please check your .env.local file.')
}

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    console.log("Creating new MongoDB client...")
    try {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    } catch (error) {
      console.error("Failed to create MongoDB client:", error)
      throw error
    }
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  console.log("Creating new MongoDB client (production)...")
  try {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  } catch (error) {
    console.error("Failed to create MongoDB client:", error)
    throw error
  }
}

export default clientPromise
