import { NextResponse } from "next/server"

export async function POST(request) {
  return NextResponse.json({ error: "This endpoint is no longer in use. Please use Google Sign-In." }, { status: 410 })
} 