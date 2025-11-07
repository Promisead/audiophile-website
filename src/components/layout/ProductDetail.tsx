"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Category from "../home/Category";
import About from "../home/About";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const [localQuantity, setLocalQuantity] = useState(1);
  const { items, addItem, updateQuantity, removeItem } = useCart();

  // Check if product is already in cart
  const cartItem = items.find((item) => item.id === product.id.toString());
  const isAdded = !!cartItem;
  const quantity = isAdded ? cartItem.quantity : localQuantity;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id.toString(),
        slug: product.slug,
        name: product.name,
        shortName: product.name.split(" ").slice(0, 2).join(" "),
        price: product.price,
        image: product.image.mobile,
      },
      localQuantity
    );

    toast.success(`Added ${localQuantity}x ${product.name} to cart!`);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) {
      // Remove from cart if quantity is 0
      removeItem(product.id.toString());
      setLocalQuantity(1);
      toast.info("Removed from cart");
      return;
    }

    updateQuantity(product.id.toString(), newQuantity);
  };

  const handleIncrement = () => {
    if (isAdded) {
      handleUpdateQuantity(quantity + 1);
    } else {
      setLocalQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (isAdded) {
      handleUpdateQuantity(quantity - 1);
    } else {
      setLocalQuantity((q) => Math.max(1, q - 1));
    }
  };

  const handleViewCart = () => {
    // This would open the cart modal
    router.push("/checkout");
  };

  return (
    <div className="font-manrope min-h-screen bg-white">
      {/* Back Button */}
      <section className="py-8 md:py-12">
        <div className="container-responsive">
          <Button variant="link" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </section>

      {/* Product Overview */}
      <section className="pb-16 md:pb-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
            {/* Product Image */}
            <div className="bg-gray-light rounded-default flex aspect-square items-center justify-center overflow-hidden">
              <Image
                src={product.image.desktop}
                alt={product.name}
                width={540}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              {product.new && (
                <p className="text-primary text-overline mb-4 uppercase md:mb-6">
                  New Product
                </p>
              )}

              <h1 className="h3 md:h2-desktop mb-6 uppercase md:mb-8">
                {product.name}
              </h1>

              <p className="body mb-6 text-black/50 md:mb-8">
                {product.description}
              </p>

              <p className="h6 mb-8">{formatPrice(product.price)}</p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Quantity Selector */}
                <div className="bg-gray-light flex h-12 w-full items-center sm:w-[120px]">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="hover:text-primary flex h-full w-12 items-center justify-center text-black/25 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const newQty = Math.max(1, parseInt(e.target.value) || 1);
                      if (isAdded) {
                        handleUpdateQuantity(newQty);
                      } else {
                        setLocalQuantity(newQty);
                      }
                    }}
                    className="h-full w-12 flex-1 [appearance:textfield] border-none bg-transparent text-center text-sm font-bold tracking-[1px] text-black focus:outline-none sm:flex-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="hover:text-primary flex h-full w-12 items-center justify-center text-black/25 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                {/* Add to Cart or View Cart Button */}
                {!isAdded ? (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-none"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex flex-1 gap-2">
                    <Button
                      variant="outline"
                      onClick={handleViewCart}
                      className="flex-1"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      View Cart
                    </Button>
                    <Button className="flex items-center gap-2 px-6" disabled>
                      <Check size={18} />
                      Added
                    </Button>
                  </div>
                )}
              </div>

              {/* Cart Status Message */}
              {isAdded && (
                <div className="text-primary mt-4 flex items-center gap-2 text-sm">
                  <Check size={16} />
                  <span className="font-medium">{quantity}x in cart •</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features & In The Box */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-24">
            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="h5 md:h3 mb-6 uppercase md:mb-8">Features</h2>
              <div className="body whitespace-pre-line text-black/50">
                {product.features}
              </div>
            </div>

            {/* In The Box */}
            <div>
              <h2 className="h5 md:h3 mb-6 uppercase md:mb-8">In the Box</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-6">
                    <span className="subtitle text-primary font-bold">
                      {item.quantity}x
                    </span>
                    <span className="body text-black/50">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="flex min-h-[592px] flex-col justify-center gap-4 md:flex-row md:gap-8">
            {/* Small Images Column */}
            <div className="flex basis-1/2 flex-col items-end gap-4 md:gap-8">
              <div className="bg-gray-light rounded-default flex h-full max-h-[280px] w-full items-center justify-center overflow-hidden md:max-w-[445px]">
                <Image
                  src={product.gallery.first.desktop}
                  alt={`${product.name} gallery 1`}
                  width={445}
                  height={280}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="bg-gray-light rounded-default flex h-full max-h-[280px] w-full items-center justify-center overflow-hidden md:max-w-[445px]">
                <Image
                  src={product.gallery.second.desktop}
                  alt={`${product.name} gallery 2`}
                  width={445}
                  height={280}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Large Image */}
            <div className="bg-gray-light rounded-default flex max-h-[592px] basis-1/2 items-center justify-center overflow-hidden md:max-w-[635px]">
              <Image
                src={product.gallery.third.desktop}
                alt={`${product.name} gallery 3`}
                width={635}
                height={592}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <h2 className="h5 md:h3 mb-10 text-center uppercase md:mb-16">
            You may also like
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-8">
            {product.others.map((item) => (
              <div key={item.slug} className="text-center">
                <div className="bg-gray-light rounded-default mb-8 flex aspect-square items-center justify-center overflow-hidden">
                  <Image
                    src={item.image.desktop}
                    alt={item.name}
                    width={350}
                    height={350}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="h5 mb-8 uppercase">{item.name}</h3>
                <Button
                  href={`/${
                    item.slug.split("-").includes("headphones")
                      ? "headphones"
                      : item.slug.split("-").includes("earphones")
                        ? "earphones"
                        : "speakers"
                  }/${item.slug}`}
                >
                  See Product
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <Category />

      {/* About Section */}
      <About />
    </div>
  );
};

export default ProductDetail;
