import { NextResponse } from "next/server";
import { mockUsers } from "../../_db";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.email || !data.password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const exists = mockUsers.some((u) => u.email === data.email);

  if (exists) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  const newUser = {
    id: mockUsers.length + 1,
    ...data,
  };

  mockUsers.push(newUser);

  return NextResponse.json({ ok: true, user: newUser });
}
