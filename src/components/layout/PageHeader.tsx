import { NextPage } from "next";
import React from "react";

const PageHeader: NextPage<{ title: string }> = ({ title }) => {
  return (
    <section className="bg-black-light py-16 md:py-24">
      <div className="container-responsive">
        <h1 className="h2-mobile md:h2-desktop text-center text-white uppercase">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHeader;
