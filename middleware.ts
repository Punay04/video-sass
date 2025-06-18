import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import path from "path";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith("/api/auth") ||
          pathname == "/login" ||
          pathname == "/register"
        ) {
          return true;
        }

        if (pathname == "/" || pathname.startsWith("/api/video")) {
          return true;
        }

        return token != null;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image | favicon.ico | public/).*)"],
};
