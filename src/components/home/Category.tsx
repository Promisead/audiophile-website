"use client";
import Image from "next/image";
import { NextPage } from "next";
import { ChevronRight } from "lucide-react";
import thumbnailHeadphones from "../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import thumbnailEarphones from "../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import thumbnailSpeakers from "../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

const Category: NextPage = () => {
  const router = useRouter();

  return (
    <section className="pt-24 pb-15 md:py-32">
      <div className="container-responsive">
        <div className="grid grid-cols-1 justify-items-center gap-[70px] md:grid-cols-3 md:gap-8">
          {/* Headphones Card */}
          <div
            className="bg-gray-light group rounded-default relative flex min-h-44 w-full max-w-[350px] cursor-pointer flex-col items-center justify-end p-8 text-center transition-shadow hover:shadow-lg"
            onClick={() => router.push("/headphones")}
          >
            <div className="absolute -top-14">
              <Image
                src={thumbnailHeadphones}
                alt="Headphones Thumbnail"
                height={200}
                width={150}
                className="object-cover object-center"
              />
            </div>
            <h3 className="h6 uppercase">Headphones</h3>
            <Button variant="link">
              SHOP
              <ChevronRight size={16} className="text-primary" />
            </Button>
          </div>

          {/* Speakers Card */}
          <div
            className="bg-gray-light group rounded-default relative flex min-h-44 w-full max-w-[350px] cursor-pointer flex-col items-center justify-end p-8 text-center transition-shadow hover:shadow-lg"
            onClick={() => router.push("/speakers")}
          >
            <div className="absolute -top-14">
              <Image
                src={thumbnailSpeakers}
                alt="Speakers Thumbnail"
                height={200}
                width={150}
                className="object-cover object-center"
              />
            </div>
            <h3 className="h6 uppercase">Speakers</h3>
            <Button variant="link">
              SHOP
              <ChevronRight size={16} className="text-primary" />
            </Button>
          </div>

          {/* Earphones Card */}
          <div
            className="bg-gray-light group rounded-default relative flex min-h-44 w-full max-w-[350px] cursor-pointer flex-col items-center justify-end p-8 text-center transition-shadow hover:shadow-lg"
            onClick={() => router.push("/earphones")}
          >
            <div className="absolute -top-14">
              <Image
                src={thumbnailEarphones}
                alt="Earphones Thumbnail"
                height={200}
                width={150}
                className="object-cover object-center"
              />
            </div>
            <h3 className="h6 uppercase">Earphones</h3>
            <Button variant="link">
              SHOP
              <ChevronRight size={16} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
