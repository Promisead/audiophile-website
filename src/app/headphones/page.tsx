import Headphones from "@/components/headphones";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Headphones | Audiophile",
  description:
    "Experience natural, lifelike audio with our range of premium headphones, speakers, and earphones.",
};

const HeadphonesPage: NextPage = () => <Headphones />;

export default HeadphonesPage;
