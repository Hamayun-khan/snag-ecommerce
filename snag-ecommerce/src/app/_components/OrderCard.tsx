"use client";

import { format } from "date-fns";
import type { Order, OrderItem } from "../../../generated/prisma";

type OrderWithItems = Order & {
  items: OrderItem[];
  };

  interface OrderCardProps {
    order: OrderWithItems;
    }

    const statusColors = {
      PENDING: "bg-yellow-100 text-yellow-800",
        PAID: "bg-green-100 text-green-800",
          FAILED: "bg-red-100 text-red-800",
            EXPIRED: "bg-gray-100 text-gray-800",
              CANCELLED: "bg-gray-100 text-gray-800",
                REFUNDED: "bg-blue-100 text-blue-800",
                  DISPUTED: "bg-orange-100 text-orange-800",
                  };

                  export function OrderCard({ order }: OrderCardProps) {
                    return (
                        <div className="border-border bg-card rounded-lg border p-6">
                              <div className="mb-4 flex items-start justify-between">
                                      <div>
                                                <h3 className="text-lg font-semibold">Order #{String(order.id).slice(-8)}</h3>
                                                          <p className="text-muted-foreground text-sm">
                                                                      {format(new Date(String(order.createdAt)), "PPP")}
                                                                                </p>
                                                                                        </div>
                                                                                                <span
                                                                                                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                                                                      statusColors[order.status]
                                                                                                                                }`}
                                                                                                                                        >
                                                                                                                                                  {order.status}
                                                                                                                                                          </span>
                                                                                                                                                                </div>

                                                                                                                                                                      <div className="mb-4 space-y-2">
                                                                                                                                                                              {order.items.map((item) => (
                                                                                                                                                                                        <div key={item.id} className="flex justify-between text-sm">
                                                                                                                                                                                                    <span>
                                                                                                                                                                                                                  {item.name} x {item.quantity}
                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                        <div className="border-border border-t pt-4">
                                                                                                                                                                                                                                                                                <div className="flex justify-between font-semibold">
                                                                                                                                                                                                                                                                                          <span>Total</span>
                                                                                                                                                                                                                                                                                                    <span>${order.totalAmount.toFixed(2)}</span>
                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                        <div className="text-muted-foreground mt-4 text-sm">
                                                                                                                                                                                                                                                                                                                                <p>
                                                                                                                                                                                                                                                                                                                                          {order.shippingAddress}, {order.city} {order.postalCode}
                                                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                                                          <p>{order.country}</p>
                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                      }