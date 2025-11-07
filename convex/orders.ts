import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
}

export const createOrder = mutation({
  args: {
    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    shippingDetails: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),
    items: v.array(
      v.object({
        productId: v.string(),
        slug: v.string(),
        name: v.string(),
        shortName: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash")),
    eMoneyDetails: v.optional(
      v.object({
        number: v.string(),
        pin: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const orderId = generateOrderId();

    const order = await ctx.db.insert("orders", {
      orderId,
      customerDetails: args.customerDetails,
      shippingDetails: args.shippingDetails,
      items: args.items,
      totals: args.totals,
      paymentMethod: args.paymentMethod,
      eMoneyDetails: args.eMoneyDetails,
      status: "confirmed",
    });

    return { orderId, _id: order };
  },
});

// Get order by ID
export const getOrder = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();
  },
});

// Get orders by email
export const getOrdersByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customerDetails.email", args.email))
      .collect();
  },
});

// Get all orders (admin)
export const getAllOrders = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("desc").take(100);
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .first();

    if (!order) {
      throw new Error("Order not found");
    }

    await ctx.db.patch(order._id, {
      status: args.status,
    });

    return { success: true };
  },
});
