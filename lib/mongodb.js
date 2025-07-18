import { MongoClient } from "mongodb"

const uri = process.env.MONGO_URI
const options = {}

console.log("MongoDB URI:", uri ? "Set" : "Not set")
console.log("NODE_ENV:", process.env.NODE_ENV)

let client
let clientPromise

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    console.log("Creating new MongoDB client...")
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  console.log("Creating new MongoDB client (production)...")
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
