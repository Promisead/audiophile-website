// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    orderId: v.string(),
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
    status: v.string(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_email", ["customerDetails.email"])
    .index("by_status", ["status"]),
});
