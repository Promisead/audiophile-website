import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    // Billing Details
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    phone: z
      .string()
      .trim()
      .superRefine((val, ctx) => {
        if (!val) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number is required",
          });
          return;
        }

        if (!/^\+?[0-9]+$/.test(val)) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number can only contain digits and an optional +",
          });
          return;
        }

        if (val.startsWith("0")) {
          ctx.addIssue({
            code: "custom",
            message:
              "Remove the leading 0 or include your country code (e.g., +234...)",
          });
          return;
        }

        if (val.length < 7) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number is too short",
          });
          return;
        }

        if (val.length > 15) {
          ctx.addIssue({
            code: "custom",
            message: "Phone number is too long",
          });
          return;
        }

        if (!/^\+?[1-9]\d{1,14}$/.test(val)) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid phone number format",
          });
        }
      }),

    // Shipping Info
    address: z.string().min(5, "Address must be at least 5 characters"),
    zipCode: z
      .string()
      .trim()
      .min(3, "Postal code is too short")
      .max(12, "Postal code is too long")
      .regex(/^[A-Za-z0-9\s\-]+$/, "Invalid postal code format"),
    city: z.string().min(2, "City must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),

    // Payment
    paymentMethod: z.enum(["e-money", "cash"]),

    // E-Money
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "e-money") {
      if (!data.eMoneyNumber || data.eMoneyNumber.trim() === "") {
        ctx.addIssue({
          path: ["eMoneyNumber"],
          message: "E-Money number is required",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.eMoneyPin || data.eMoneyPin.trim() === "") {
        ctx.addIssue({
          path: ["eMoneyPin"],
          message: "E-Money PIN is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
