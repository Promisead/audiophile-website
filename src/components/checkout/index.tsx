"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Radio } from "@/components/ui/Radio";
import {
  CheckoutFormData,
  checkoutFormSchema,
} from "@/lib/validations/checkout";
import { formatPrice } from "@/lib/utils";
import OrderConfirmationModal from "../modals/ConfirmationModal";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useCart } from "@/context/CartContext";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import { toast } from "sonner";
import cash from "../../../public/assets/checkout/icon-cash-on-delivery.svg";

const Checkout: NextPage = () => {
  const router = useRouter();
  const { items, clearCart, subtotal, shipping, vat, grandTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"e-money" | "cash">(
    "e-money"
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createOrder = useMutation(api.orders.createOrder);

  useEffect(() => {
    if (items.length === 0 && !showConfirmation) {
      router.push("/");
    }
  }, [items.length, showConfirmation, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentMethod: "e-money",
    },
  });

  const onSubmit = async (formData: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Create the order in Convex
      const result = await createOrder({
        customerDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingDetails: {
          address: formData.address,
          zipCode: formData.zipCode,
          city: formData.city,
          country: formData.country,
        },
        items: items.map((item) => ({
          productId: item.id,
          slug: item.slug,
          name: item.name,
          shortName: item.shortName,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totals: { subtotal, shipping, vat, grandTotal },
        paymentMethod: formData.paymentMethod,
        eMoneyDetails:
          formData.paymentMethod === "e-money"
            ? {
                number: formData.eMoneyNumber!,
                pin: formData.eMoneyPin!,
              }
            : undefined,
      });

      // Send the confirmation email
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: result.orderId,
            customerDetails: {
              name: formData.name,
              email: formData.email,
            },
            items: items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            totals: { subtotal, shipping, vat, grandTotal },
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          toast.error("Order placed, but confirmation email failed.", {
            description: data.error || "Failed to send confirmation email"
          });
        }
      } catch (error) {
        toast.error("Your order was placed, but the confirmation email failed.", {
          description: "Failed to send confirmation email"
        });
      }

      // Show confirmation modal
      setShowConfirmation(true);

      // Clear cart
      clearCart();
    } catch {
      toast.error("Checkout failed", {
        description:
          "Checkout failed and order was not placed. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-medium font-manrope min-h-screen">
      {/* Go Back */}
      <section>
        <div className="container-responsive py-8 md:py-12">
          <Button variant="link" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-8 md:py-16">
        <div className="container-responsive">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-default bg-white p-6 md:p-12 lg:col-span-2"
            >
              <h1 className="h3 md:h2-mobile mb-8 uppercase md:mb-10">
                Checkout
              </h1>

              {/* Billing Details */}
              <div className="mb-8 md:mb-12">
                <h2 className="subtitle text-primary mb-4 uppercase">
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <Input
                      label="Name"
                      id="name"
                      type="text"
                      placeholder="Alexei Ward"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="alexei@mail.com"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-1">
                    <Input
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      placeholder="+1 202-555-0136"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8 md:mb-12">
                <h2 className="subtitle text-primary mb-4 uppercase">
                  Shipping Info
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Address */}
                  <div className="md:col-span-2">
                    <Input
                      label="Your Address"
                      id="address"
                      type="text"
                      placeholder="1137 Williams Avenue"
                      {...register("address")}
                      error={errors.address?.message}
                    />
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <Input
                      label="ZIP Code"
                      id="zipCode"
                      type="text"
                      placeholder="10001"
                      {...register("zipCode")}
                      error={errors.zipCode?.message}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Input
                      label="City"
                      id="city"
                      type="text"
                      placeholder="New York"
                      {...register("city")}
                      error={errors.city?.message}
                    />
                  </div>

                  {/* Country */}
                  <div className="md:col-span-1">
                    <Input
                      label="Country"
                      id="country"
                      type="text"
                      placeholder="United States"
                      {...register("country")}
                      error={errors.country?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h2 className="subtitle text-primary mb-4 uppercase">
                  Payment Details
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Payment Method */}
                  <div className="flex justify-between gap-4 md:col-span-2">
                    <label className="mb-4 block basis-1/2 text-xs leading-4 font-bold tracking-[-0.21px] text-black">
                      Payment Method
                    </label>

                    <div className="basis-1/2 space-y-4">
                      <Radio
                        label="e-Money"
                        {...register("paymentMethod")}
                        type="radio"
                        value="e-money"
                        onChange={() => setPaymentMethod("e-money")}
                      />

                      {/* Cash on Delivery */}
                      <Radio
                        label="Cash on Delivery"
                        {...register("paymentMethod")}
                        type="radio"
                        value="cash"
                        className="radio"
                        onChange={() => setPaymentMethod("cash")}
                      />
                    </div>
                  </div>

                  {/* E-Money Fields (Conditional) */}
                  {paymentMethod === "e-money" && (
                    <>
                      <div>
                        <Input
                          label="e-Money Number"
                          id="eMoneyNumber"
                          type="text"
                          placeholder="238521993"
                          {...register("eMoneyNumber")}
                          error={errors.eMoneyNumber?.message}
                        />
                      </div>

                      <div>
                        <Input
                          label="e-Money PIN"
                          id="eMoneyPin"
                          type="text"
                          placeholder="6891"
                          {...register("eMoneyPin")}
                          error={errors.eMoneyPin?.message}
                        />
                      </div>
                    </>
                  )}
                </div>
                {paymentMethod === "cash" && (
                  <div className="mt-8 flex w-full items-center gap-8">
                    <Image src={cash} alt="Cash on Delivery" />
                    <p className="text-black/50">
                      The ‘Cash on Delivery’ option enables you to pay in cash
                      when our delivery courier arrives at your residence. Just
                      make sure your address is correct so that your order will
                      not be cancelled.
                    </p>
                  </div>
                )}
              </div>
            </form>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-default sticky top-8 bg-white p-6 md:p-8">
                <h2 className="h6 mb-8 uppercase">Summary</h2>

                {/* Cart Items */}
                <div className="mb-6 space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="bg-gray-light rounded-default flex h-16 w-16 shrink-0 items-center justify-center">
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
                        <p className="body text-black/50">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="body font-bold text-black/50">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mb-8 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">Total</span>
                    <span className="h6">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">
                      Shipping
                    </span>
                    <span className="h6">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body text-black/50 uppercase">
                      VAT (Included)
                    </span>
                    <span className="h6">{formatPrice(vat)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <span className="body text-black/50 uppercase">
                      Grand Total
                    </span>
                    <span className="h6 text-primary">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 uppercase"
                >
                  {isSubmitting ? "Processing..." : "Continue & Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          window.location.reload();
        }}
        items={items}
        grandTotal={grandTotal}
      />
    </div>
  );
};

export default Checkout;
