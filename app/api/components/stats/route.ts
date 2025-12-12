import { NextResponse } from "next/server";
import { mockEvents } from "../../_db";

export async function GET() {
  return NextResponse.json({
    total: mockEvents.length,
    events: mockEvents,
  });
}
