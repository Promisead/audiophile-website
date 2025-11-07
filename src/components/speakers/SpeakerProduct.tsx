import { NextPage } from "next";
import Image from "next/image";
import { Button } from "../ui/Button";
import { getProductBySlug } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "ZX9 Speaker",
    slug: "zx9-speaker",
    new: true,
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    image:
      "/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg",
    imagePosition: "left",
  },
  {
    id: 2,
    name: "ZX7 Speaker",
    slug: "zx7-speaker",
    new: false,
    description:
      "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    image:
      "/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg",
    imagePosition: "right",
  },
];
const SpeakerProduct: NextPage = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-responsive space-y-24 lg:space-y-32">
        {products.map((item) => {
          const product = getProductBySlug(item.slug);
          return (
            <article
              key={product?.id}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Product Image */}
              <div
                className={`${
                  item.imagePosition === "left" ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="bg-gray-light rounded-default flex aspect-video items-center justify-center overflow-hidden lg:aspect-square">
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
                className={`text-center lg:text-left ${
                  item.imagePosition === "left" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {product?.new && (
                  <p className="text-primary text-overline mb-4 uppercase lg:mb-6">
                    New Product
                  </p>
                )}

                <h2 className="h4 lg:h2-mobile mb-6 uppercase lg:mb-8">
                  {product?.name}
                </h2>

                <p className="body mx-auto mb-6 max-w-[445px] text-black/50 lg:mx-0 lg:mb-10">
                  {product?.description}
                </p>

                <Button
                  className="btn-primary px-8 py-4"
                  href={`/speakers/${product?.slug}`}
                >
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

export default SpeakerProduct;
