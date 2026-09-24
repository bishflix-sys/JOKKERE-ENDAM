import { NextResponse } from "next/server";
import { isValidSession } from "../../../../lib/session";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function GET(request) {
  const session = request.cookies.get("ultra_session")?.value;
  if (!await isValidSession(session)) {
    return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/api/ultra/status`, {
    headers: { Authorization: `Bearer ${process.env.ULTRA_API_TOKEN || ""}` },
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "Backend indisponible" }, { status: 502 });
  return NextResponse.json(await response.json());
}
