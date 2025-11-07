"use client";

import About from "../home/About";
import Category from "../home/Category";
import PageHeader from "../layout/PageHeader";
import EarphoneProduct from "./EarphoneProduct";

export default function SpeakersPage() {
  return (
    <div className="font-manrope min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title="Earphones" />

      {/* Product List */}
      <EarphoneProduct />

      {/* Category Cards */}
      <Category />

      {/* About Section */}
      <About />
    </div>
  );
}
