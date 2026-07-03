import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

//Middleware
export default async function proxy(request: NextRequest) {
  const session = await getSession();

  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");
  if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
