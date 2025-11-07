// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronRight } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../modals/CartModal";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import logo from "../../../public/assets/logo.svg";
import thumbnailHeadphones from "../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import thumbnailEarphones from "../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import thumbnailSpeakers from "../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";

const Navbar: NextPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      setTimeout(() => setMobileMenuOpen(false), 0);
    }
  }, [pathname, mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-black-light sticky top-0 z-50 border-b border-white/10 print:hidden">
        <div className="container-responsive">
          <div className="flex items-center justify-between py-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:text-primary text-white transition-colors md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="hover:text-primary text-2xl font-bold text-white lowercase transition-colors"
            >
              <Image src={logo} alt="logo" />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-8 md:flex"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                className={`text-subtitle tracking-[2px] uppercase transition-colors ${
                  isActive("/")
                    ? "text-primary"
                    : "hover:text-primary text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/headphones"
                className={`text-subtitle tracking-[2px] uppercase transition-colors ${
                  isActive("/headphones")
                    ? "text-primary"
                    : "hover:text-primary text-white"
                }`}
              >
                Headphones
              </Link>
              <Link
                href="/speakers"
                className={`text-subtitle tracking-[2px] uppercase transition-colors ${
                  isActive("/speakers")
                    ? "text-primary"
                    : "hover:text-primary text-white"
                }`}
              >
                Speakers
              </Link>
              <Link
                href="/earphones"
                className={`text-subtitle tracking-[2px] uppercase transition-colors ${
                  isActive("/earphones")
                    ? "text-primary"
                    : "hover:text-primary text-white"
                }`}
              >
                Earphones
              </Link>
            </nav>

            {/* Cart Icon */}
            <button
              className="hover:text-primary relative text-white transition-colors"
              aria-label={`Shopping cart with ${totalItems} items`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="bg-primary absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden print:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-[89px] right-0 left-0 z-40 h-screen bg-white transition-transform duration-300 md:hidden print:hidden ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="container-responsive py-16">
          {/* Category Cards */}
          <div className="mb-8 grid grid-cols-1 gap-14">
            {/* Headphones Card */}
            <Link
              href="/headphones"
              className="bg-gray-light group relative rounded-lg p-6 pt-16 text-center transition-all hover:shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute top-0 left-1/2 mx-auto mb-4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
                <Image
                  src={thumbnailHeadphones}
                  alt="Headphones Thumbnail"
                  height={200}
                  width={150}
                  className="object-cover object-center"
                />
              </div>
              <h3 className="h6 mb-3 uppercase">Headphones</h3>
              <button className="text-subtitle group-hover:text-primary inline-flex items-center gap-2 font-bold text-black/50 uppercase transition-colors">
                Shop
                <ChevronRight size={16} className="text-primary" />
              </button>
            </Link>

            {/* Speakers Card */}
            <Link
              href="/speakers"
              className="bg-gray-light group relative rounded-lg p-6 pt-16 text-center transition-all hover:shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute top-0 left-1/2 mx-auto mb-4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
                <Image
                  src={thumbnailSpeakers}
                  alt="Speakers Thumbnail"
                  height={200}
                  width={150}
                  className="object-cover object-center"
                />
              </div>
              <h3 className="h6 mb-3 uppercase">Speakers</h3>
              <button className="text-subtitle group-hover:text-primary inline-flex items-center gap-2 font-bold text-black/50 uppercase transition-colors">
                Shop
                <ChevronRight size={16} className="text-primary" />
              </button>
            </Link>

            {/* Earphones Card */}
            <Link
              href="/earphones"
              className="bg-gray-light group relative rounded-lg p-6 pt-16 text-center transition-all hover:shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute top-0 left-1/2 mx-auto mb-4 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
                <Image
                  src={thumbnailEarphones}
                  alt="Earphones Thumbnail"
                  height={200}
                  width={150}
                  className="object-cover object-center"
                />
              </div>
              <h3 className="h6 mb-3 uppercase">Earphones</h3>
              <button className="text-subtitle group-hover:text-primary inline-flex items-center gap-2 font-bold text-black/50 uppercase transition-colors">
                Shop
                <ChevronRight size={16} className="text-primary" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
      />
    </>
  );
};

export default Navbar;
