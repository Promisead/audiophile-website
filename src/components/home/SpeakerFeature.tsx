import { NextPage } from "next";
import Image from "next/image";
import zx9 from "../../../public/assets/home/desktop/image-speaker-zx9.png";
import patternCircle from "../../../public/assets/home/desktop/pattern-circles.svg";
import zx7 from "../../../public/assets/home/desktop/image-speaker-zx7.jpg";
import earphones from "../../../public/assets/home/desktop/image-earphones-yx1.jpg";
import { Button } from "../ui/Button";

const SpeakerFeature: NextPage = () => {
  return (
    <div className="pt-15 md:pt-24">
      {/* ZX9 Speaker Feature */}
      <section>
        <div className="container-responsive">
          <div className="bg-primary rounded-default relative min-h-[550px] overflow-hidden">
            <div className="grid min-h-[550px] grid-rows-2 items-center p-8 lg:grid-cols-1 lg:grid-rows-1 lg:gap-12">
              <div className="row-start-1">
                <div className="absolute -top-9 lg:-left-[146px]">
                  <Image
                    src={patternCircle}
                    alt="Pattern Circle"
                    width={944}
                    className="h-[560px] object-cover object-center"
                  />
                </div>
                <div className="flex justify-center lg:absolute lg:bottom-0">
                  <Image
                    src={zx9}
                    alt="ZX9 Speaker"
                    height={493}
                    width={410}
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative z-10 row-start-2 pt-9 text-center text-white lg:col-start-2 lg:text-left xl:text-left">
                <h2 className="h1-mobile md:h1-desktop text-white uppercase">
                  ZX9
                  <br />
                  Speaker
                </h2>
                <p className="body mx-auto mt-6 max-w-[350px] text-white/75 xl:mx-0">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>
                <Button
                  variant="black"
                  className="btn-black mt-10 px-8 py-4"
                  href="/speakers/zx9-speaker"
                >
                  See Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZX7 Speaker Feature */}
      <section className="py-8">
        <div className="container-responsive">
          <div className="bg-gray-light rounded-default relative min-h-80 overflow-hidden">
            <div className="relative h-full min-h-80 items-center gap-0">
              <div className="relative z-10 order-2 p-8 md:p-16 xl:order-1">
                <h3 className="h4 uppercase">ZX7 Speaker</h3>
                <Button
                  variant="outline"
                  className="btn-outline mt-8 px-8 py-4"
                  href="/speakers/zx7-speaker"
                >
                  See Product
                </Button>
              </div>

              <div className="absolute top-0 right-0 h-full w-full">
                <Image
                  src={zx7}
                  alt="ZX7 Speaker"
                  fill
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YX1 Earphones Feature */}
      <section className="py-8 pb-16 md:pb-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-light rounded-default overflow-hidden">
              <div className="flex h-full w-full items-center justify-center">
                <Image
                  src={earphones}
                  alt="YX1 Earphones"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="bg-gray-light rounded-default flex flex-col justify-center p-8 md:p-16">
              <h3 className="h4 uppercase">YX1 Earphones</h3>
              <Button
                variant="outline"
                className="btn-outline mt-8 w-fit px-8 py-4"
                href="/earphones/yx1-earphones"
              >
                See Product
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakerFeature;
