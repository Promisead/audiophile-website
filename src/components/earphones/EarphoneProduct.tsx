import { NextPage } from "next";
import Image from "next/image";
import { Button } from "../ui/Button";
import { getProductBySlug } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "YX1 Wireless Earphones",
    slug: "yx1-earphones",
    new: true,
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    image:
      "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg",
    imagePosition: "left",
  },
];
const EarphoneProduct: NextPage = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-responsive space-y-24 md:space-y-32">
        {products.map((item) => {
          const product = getProductBySlug(item.slug);
          return (
            <article
              key={product?.id}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              {/* Product Image */}
              <div
                className={`${
                  item.imagePosition === "left" ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="bg-gray-light rounded-default flex items-center justify-center overflow-hidden lg:aspect-square">
                  <div className="text-gray-dark text-sm">
                    <picture>
                      <source
                        srcSet={product?.image.mobile}
                        media="(max-width: 767px)"
                      />
                      <source
                        srcSet={product?.image.tablet}
                        media="(max-width: 1023px)"
                      />
                      <Image
                        src={product?.image.desktop || item.image}
                        alt={product?.name || item.name}
                        width={540}
                        height={560}
                        className="object-center p-10"
                      />
                    </picture>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div
                className={`text-center md:text-left ${
                  item.imagePosition === "left" ? "md:order-2" : "md:order-1"
                }`}
              >
                {product?.new && (
                  <p className="text-primary text-overline mb-4 uppercase md:mb-6">
                    New Product
                  </p>
                )}

                <h2 className="h4 md:h2-mobile mb-6 uppercase md:mb-8">
                  {product?.name}
                </h2>

                <p className="body mx-auto mb-6 max-w-[445px] text-black/50 md:mx-0 md:mb-10">
                  {product?.description}
                </p>

                <Button href={`/earphones/${product?.slug}`}>
                  See Product
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EarphoneProduct;
