import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST: Create a new campaign
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      type,
      audience,
      subject,
      content,
      status = "draft",
      scheduledTime = null,
    } = body;

    if (!name || !type || !audience) {
      return NextResponse.json({ error: "Name, type, and audience are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("ecommerce_crm");
    const campaigns = db.collection("campaigns");

    const campaignData = {
      name,
      type,
      audience,
      subject: subject || "",
      content: content || "",
      status, // draft, scheduled, active, completed
      scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await campaigns.insertOne(campaignData);
    return NextResponse.json({ success: true, campaign: { ...campaignData, _id: result.insertedId } });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET: List all campaigns
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecommerce_crm");
    const campaigns = db.collection("campaigns");
    const allCampaigns = await campaigns.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, campaigns: allCampaigns });
  } catch (error) {
    console.error("Get campaigns error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 