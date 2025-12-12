import { NextResponse } from "next/server";
import { mockEvents } from "../../_db";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    if (!event || !event.component || !event.action) {
      return NextResponse.json(
        { error: "Invalid tracking payload" },
        { status: 400 }
      );
    }

    mockEvents.push(event);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
