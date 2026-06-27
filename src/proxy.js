import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname =
    request.nextUrl.pathname;

  // Login required routes
  const protectedRoutes = [
    "/pricing",
    "/dashboard",
    "/lessons/",
  ];

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (
    isProtected &&
    !session
  ) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(
      loginUrl
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pricing",
     "/pricing/:path*",
    "/dashboard/:path*",
    "/lessons/:path*",
  ],
};