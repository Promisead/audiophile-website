"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { NextPage } from "next";

const OrderDetail: NextPage<{ orderId: string }> = ({ orderId }) => {
  const router = useRouter();
  const order = useQuery(api.orders.getOrder, { orderId });

  if (order === undefined) {
    return (
      <div className="bg-white-off flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="body text-black/50">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="bg-gray-medium flex min-h-screen items-center justify-center">
        <div className="container-responsive text-center">
          <h1 className="h3 mb-4">Order Not Found</h1>
          <p className="body mb-8 text-black/50">
            The order {"you're"} looking for {"doesn't"} exist or has been
            removed.
          </p>
          <button
            onClick={() => router.push("/")}
            className="btn-primary px-8 py-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order._creationTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "delivered":
        return "text-primary bg-primary/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getDescription = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Thank you for your order! We'll send you a shipping confirmation email as soon as your order ships.";

      case "shipped":
        return "Your order is on the way! You can track its progress using the tracking information we sent to via email.";

      case "delivered":
        return "Your order has been delivered successfully. We hope you enjoy your purchase!";

      default:
        return "Your order is being processed. We'll update you as soon as its status changes.";
    }
  };

  return (
    <div className="bg-white-off font-manrope min-h-screen">
      {/* Header */}
      <section className="border-b border-black/10 print:hidden">
        <div className="container-responsive py-8 md:py-12 print:hidden">
          <button
            onClick={() => router.push("/")}
            className="body hover:text-primary mb-4 text-black/50 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-8 md:py-16">
        <div className="container-responsive">
          <div className="mx-auto max-w-4xl">
            {/* Success Header */}
            <div className="mb-8 rounded-lg bg-white p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
                  <Check size={32} className="text-white" strokeWidth={3} />
                </div>

                <div className="flex-1">
                  <h1 className="h4 md:h3 mb-2 uppercase">Order Confirmed</h1>
                  <p className="body mb-4 text-black/50">
                    {getDescription(order.status)}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-black/50">Order ID: </span>
                      <span className="text-primary font-bold">
                        {order.orderId}
                      </span>
                    </div>
                    <div>
                      <span className="text-black/50">Date: </span>
                      <span className="font-bold">{orderDate}</span>
                    </div>
                    <div>
                      <span className="text-black/50">Status: </span>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Order Items */}
              <div className="rounded-lg bg-white p-6 md:p-8 lg:col-span-2">
                <h2 className="h6 mb-6 uppercase">Order Items</h2>

                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 border-b border-black/10 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="bg-gray-light rounded-default flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={540}
                          height={560}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="body font-bold text-black">
                          {item.name}
                        </h3>
                        <p className="body text-sm text-black/50">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="body font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="mt-8 space-y-2 border-t border-black/10 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">
                      Subtotal
                    </span>
                    <span className="body font-bold">
                      {formatPrice(order.totals.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">
                      Shipping
                    </span>
                    <span className="body font-bold">
                      {formatPrice(order.totals.shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">
                      VAT (Included)
                    </span>
                    <span className="body font-bold">
                      {formatPrice(order.totals.vat)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="h6 uppercase">Grand Total</span>
                    <span className="h6 text-primary">
                      {formatPrice(order.totals.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-6 lg:col-span-1">
                {/* Customer Details */}
                <div className="rounded-lg bg-white p-6">
                  <h2 className="h6 mb-4 uppercase">Customer Details</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="mb-1 text-xs text-black/50 uppercase">
                        Name
                      </p>
                      <p className="body font-bold">
                        {order.customerDetails.name}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-black/50 uppercase">
                        Email
                      </p>
                      <p className="body">{order.customerDetails.email}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-black/50 uppercase">
                        Phone
                      </p>
                      <p className="body">{order.customerDetails.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="rounded-lg bg-white p-6">
                  <h2 className="h6 mb-4 uppercase">Shipping Address</h2>
                  <div className="body space-y-1 text-black/75">
                    <p>{order.shippingDetails.address}</p>
                    <p>
                      {order.shippingDetails.city},{" "}
                      {order.shippingDetails.zipCode}
                    </p>
                    <p>{order.shippingDetails.country}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-lg bg-white p-6">
                  <h2 className="h6 mb-4 uppercase">Payment Method</h2>
                  <div className="flex items-center gap-2">
                    {order.paymentMethod === "e-money" ? (
                      <>
                        <svg
                          className="text-primary h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        <span className="body font-bold">e-Money</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="text-primary h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="body font-bold">Cash on Delivery</span>
                      </>
                    )}
                  </div>
                  {order.eMoneyDetails && (
                    <div className="mt-3 border-t border-black/10 pt-3">
                      <p className="text-xs text-black/50">
                        •••• •••• •••• {order.eMoneyDetails.number.slice(-4)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 print:hidden">
                  <Button
                    variant={"outline"}
                    className="w-full"
                    onClick={() => window.print()}
                  >
                    Print Order
                  </Button>
                  <Button className="w-full" onClick={() => router.push("/")}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetail;
