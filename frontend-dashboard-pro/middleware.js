import { NextResponse } from "next/server";
import { isValidSession } from "./lib/session";

export async function middleware(request) {
  if (request.nextUrl.pathname === "/dashboard.html" && !await isValidSession(request.cookies.get("ultra_session")?.value)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard.html",
};
