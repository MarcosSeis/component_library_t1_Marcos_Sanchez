import { NextResponse } from "next/server";
import { mockUsers } from "../../_db";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // Fake JWT (real one will be generated in Express backend)
  const fakeToken = "mock-jwt-token-" + Math.random().toString(36).substring(2);

  return NextResponse.json({
    ok: true,
    token: fakeToken,
    user,
  });
}
