import { NextPage } from "next";
import Image from "next/image";
import { Button } from "../ui/Button";
import { getProductBySlug } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "XX99 Mark II Headphones",
    slug: "xx99-mark-two-headphones",
    new: true,
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    image:
      "/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg",
    imagePosition: "left",
  },
  {
    id: 2,
    name: "XX99 Mark I Headphones",
    slug: "xx99-mark-one-headphones",
    new: false,
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    image:
      "/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg",
    imagePosition: "right",
  },
  {
    id: 3,
    name: "XX59 Headphones",
    slug: "xx59-headphones",
    new: false,
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    image:
      "/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg",
    imagePosition: "left",
  },
];

const HeadphoneProduct: NextPage = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-responsive space-y-24 lg:space-y-32">
        {products.map((item) => {
          const product = getProductBySlug(item.slug);
          return (
            <article
              key={product?.id || item.slug}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Product Image */}
              <div
                className={`${
                  item.imagePosition === "left" ? "lg:order-1" : "lg:order-2"
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
                className={`text-center lg:text-left ${
                  item.imagePosition === "left" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {product?.new ? (
                  <p className="text-primary text-overline mb-4 uppercase lg:mb-6">
                    New Product
                  </p>
                ) : (
                  ""
                )}

                <h2 className="h4 lg:h2-mobile mb-6 uppercase lg:mb-8">
                  {product?.name}
                </h2>

                <p className="body mx-auto mb-6 max-w-[445px] text-black/50 lg:mx-0 lg:mb-10">
                  {product?.description}
                </p>

                <Button href={`/headphones/${product?.slug}`}>
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

export default HeadphoneProduct;
