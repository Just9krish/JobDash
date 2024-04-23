import { auth } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  console.log("pathanme", nextUrl.pathname);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, "[^/]+")}$`);
    return regex.test(nextUrl.pathname);
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("API Auth route: ", isApiAuthRoute);
  console.log("public route: ", isPublicRoute);
  console.log("Auth route: ", isApiAuthRoute);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// the matcher will invoke the middleware and above function will execute
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
