import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes that DON'T require authentication
const isPublicRoute = createRouteMatcher([
  "/", // Homepage
  "/cart", // Cart page
  "/checkout", // Checkout page (guest checkout!)
  "/success(.*)", // Success page
  "/cancel", // Cancel page
  "/api/trpc/(.*)", // tRPC endpoints (we'll handle auth per-procedure)
  "/api/webhooks/stripe", // Stripe webhooks (CRITICAL!)
  "/api/webhooks/clerk", // Clerk webhooks (we'll add this)
  "/sign-in(.*)", // Clerk sign-in
  "/sign-up(.*)", // Clerk sign-up
]);

// Protected routes (only accessible when logged in)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/orders(.*)", // Order history page
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Protect specific routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
