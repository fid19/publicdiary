import { NextRequest } from "next/server";
import { updateSession } from "./lib/actions/user.action";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|sign-in|sign-up|assets|notes|profile|$).*)",
  ],
};
