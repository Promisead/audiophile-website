"use client";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

const CartModal = ({ isOpen, onClose, onCheckout }: CartModalProps) => {
  const { items, updateQuantity, clearCart, totalItems, grandTotal } =
    useCart();

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

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-x-0 top-[130px] z-50 flex h-full justify-end px-6 md:px-10 lg:px-40"
        onClick={onClose}
      >
        <div
          className="rounded-default h-max w-full max-w-[377px] bg-white p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="h6 uppercase">Cart ({totalItems})</h2>
            {totalItems ? (
              <button
                onClick={clearCart}
                className="body hover:text-primary text-black/50 underline transition-colors"
              >
                Remove all
              </button>
            ) : (
              ""
            )}
          </div>

          {/* Cart Items */}
          <div className="mb-8 space-y-6">
            {items.length === 0 ? (
              <p className="body py-8 text-center text-black/50">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="bg-gray-light rounded-default flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={540}
                      height={560}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="body truncate font-bold text-black">
                      {item.shortName}
                    </h3>
                    <p className="body text-black/50">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="bg-gray-light flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="hover:text-primary flex h-8 w-8 items-center justify-center text-black/25 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <span className="text-sm font-bold">-</span>
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="hover:text-primary flex h-8 w-8 items-center justify-center text-black/25 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <span className="text-sm font-bold">+</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total */}
          {items.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <span className="body text-black/50 uppercase">Total</span>
                <span className="h6">{formatPrice(grandTotal)}</span>
              </div>

              {/* Checkout Button */}
              <Button onClick={onCheckout} className="w-full">
                Checkout
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
