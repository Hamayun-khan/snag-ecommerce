import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { api } from "~/trpc/server";
import { OrderCard } from "../_components/OrderCard";

export default async function OrdersPage() {
  // Clerk auth (sync in App Router)
  const { userId } = await auth();

  // Protect route
  if (!userId) {
    redirect("/sign-in?redirect_url=/orders");
  }

  // Fetch only current user's orders (server-side)
  const { orders } = await api.order.getMyOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="border-border rounded-lg border p-8 text-center">
          <p className="text-muted-foreground text-lg">
            You haven&apos;t placed any orders yet.
          </p>

          <Link
            href="/"
            className="text-primary mt-4 inline-block hover:underline"
          >
            Start shopping →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
