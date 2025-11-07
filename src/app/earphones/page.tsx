import Earphones from "@/components/earphones";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earphones | Audiophile",
  description:
    "Experience natural, lifelike audio with our range of premium headphones, speakers, and earphones.",
};

const EarphonesPage = () => <Earphones />;

export default EarphonesPage;
