"use client";

import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  grandTotal: number;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  items,
  grandTotal,
}: OrderConfirmationModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup to reset overflow when modal unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const firstItem = items && items[0];
  const remainingItemsCount = items?.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="rounded-default w-full max-w-[540px] bg-white p-8 md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <Check size={32} className="text-white" strokeWidth={3} />
          </div>

          {/* Title */}
          <h1 className="h5 md:h3 mb-4 uppercase md:mb-6">
            Thank you
            <br />
            for your order
          </h1>

          {/* Subtitle */}
          <p className="body mb-6 text-black/50 md:mb-8">
            You will receive an email confirmation shortly.
          </p>

          {/* Order Summary Box */}
          <div className="rounded-default mb-6 overflow-hidden md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Items Section */}
              <div className="bg-gray-light p-6">
                {/* First Item */}
                <div className="flex items-center gap-4 pb-3">
                  <div className="bg-white-off rounded-default flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden md:h-16 md:w-16">
                    <Image
                      src={firstItem?.image}
                      alt={firstItem?.name}
                      width={540}
                      height={560}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="body truncate font-bold text-black">
                      {firstItem?.name}
                    </h3>
                    <p className="body text-black/50">
                      {formatPrice(firstItem?.price || 0)}
                    </p>
                  </div>
                  <span className="body font-bold text-black/50">
                    x{firstItem?.quantity}
                  </span>
                </div>

                {/* Other Items Divider */}
                {remainingItemsCount > 0 && (
                  <>
                    <div className="my-3 border-t border-black/10" />
                    <p className="text-center text-xs font-bold text-black/50">
                      and {remainingItemsCount} other item(s)
                    </p>
                  </>
                )}
              </div>

              {/* Grand Total Section */}
              <div className="flex flex-col justify-end bg-black p-6">
                <p className="body mb-2 text-white/50 uppercase">Grand Total</p>
                <p className="h6 text-white">{formatPrice(grandTotal)}</p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <Button onClick={onClose} className="w-full uppercase">
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
}
