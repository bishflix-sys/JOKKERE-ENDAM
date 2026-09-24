import { NextResponse } from "next/server";
import { createSessionValue } from "../../../lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function POST(request) {
  const { token } = await request.json();
  if (!token) return NextResponse.json({ error: "Token requis" }, { status: 400 });

  const response = await fetch(`${API_URL}/api/ultra/status`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "Token invalide" }, { status: 401 });

  const result = NextResponse.json({ ok: true });
  result.cookies.set("ultra_session", await createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return result;
}

export async function DELETE() {
  const result = NextResponse.json({ ok: true });
  result.cookies.set("ultra_session", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return result;
}
