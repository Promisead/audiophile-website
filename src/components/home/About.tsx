import { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-responsive">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h2 className="h2-mobile md:h2-desktop text-center uppercase lg:text-left">
              Bringing you the <br />
              <span className="text-primary">best</span> audio gear
            </h2>
            <p className="body mt-8 text-center text-black/50 lg:text-left">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              room available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-default flex w-full items-center justify-center overflow-hidden">
              <div>
                <picture>
                  <source
                    srcSet="/assets/shared/mobile/image-best-gear.jpg"
                    media="(max-width: 767px)"
                  />
                  <source
                    srcSet="/assets/shared/tablet/image-best-gear.jpg"
                    media="(max-width: 1023px)"
                  />
                  <Image
                    src="/assets/shared/desktop/image-best-gear.jpg"
                    alt="XX99 Mark II Headphones"
                    width={1040}
                    height={540}
                    priority
                    className="object-cover object-center"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
