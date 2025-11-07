"use client";

import About from "../home/About";
import Category from "../home/Category";
import PageHeader from "../layout/PageHeader";
import SpeakerProduct from "./SpeakerProduct";

const Speakers = () => {
  return (
    <div className="font-manrope min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader title="Speakers" />

      {/* Product List */}
      <SpeakerProduct />

      {/* Category Cards */}
      <Category />

      {/* About Section */}
      <About />
    </div>
  );
};

export default Speakers;
