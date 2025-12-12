import { NextResponse } from "next/server";
import { mockEvents } from "../../_db";

export async function GET() {
  const header = "timestamp,component,action,variant\n";

  const rows = mockEvents
    .map(
      (e) =>
        `${e.timestamp},${e.component},${e.action},${e.variant || ""}`
    )
    .join("\n");

  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=analytics.csv",
    },
  });
}
