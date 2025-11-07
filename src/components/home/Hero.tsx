import { NextPage } from "next";
import Image from "next/image";
import { Button } from "../ui/Button";

const Hero: NextPage = () => {
  return (
    <section className="bg-black-light relative py-16 md:py-24 xl:h-screen xl:max-h-[729px] xl:py-32">
      <div className="container-responsive">
        <div className="grid w-full grid-cols-1 items-center gap-12 xl:grid-cols-2">
          <div className="relative z-10 pt-20 text-center xl:text-left">
            <p className="text-overline text-white/50 uppercase">New Product</p>
            <h1 className="h1-mobile md:h1-desktop mt-6 text-white uppercase">
              XX99 Mark II
              <br />
              Headphones
            </h1>
            <p className="body mx-auto mt-6 max-w-[350px] text-white/75 xl:mx-0">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Button
              className="btn-primary mt-10 px-8 py-4"
              href="/headphones/xx99-mark-two-headphones"
            >
              See Product
            </Button>
          </div>

          <div className="absolute top-0 right-0 h-full w-full text-center text-white/50">
            <picture className="object-cover object-center">
              <source
                srcSet="/assets/home/mobile/image-header.jpg"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/assets/home/tablet/image-header.jpg"
                media="(max-width: 1279px)"
              />
              <Image
                src="/assets/home/desktop/image-hero.jpg"
                alt="XX99 Mark II Headphones"
                fill
                priority
                className="object-cover object-center"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
