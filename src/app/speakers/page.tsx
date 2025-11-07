import Speakers from "@/components/speakers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speakers | Audiophile",
  description:
    "Experience natural, lifelike audio with our range of premium headphones, speakers, and earphones.",
};

const SpeakersPage = () => <Speakers />;

export default SpeakersPage;
