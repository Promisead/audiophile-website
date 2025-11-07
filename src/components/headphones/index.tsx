"use client";

import About from "@/components/home/About";
import Category from "@/components/home/Category";
import { NextPage } from "next";
import PageHeader from "../layout/PageHeader";
import HeadphoneProduct from "./HeadphoneProduct";

const Headphones: NextPage = () => {
  return (
    <div className="font-manrope min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title="Headphones" />

      {/* Product List */}
      <HeadphoneProduct />

      {/* Category Cards */}
      <Category />

      {/* About Section */}
      <About />
    </div>
  );
};

export default Headphones;
