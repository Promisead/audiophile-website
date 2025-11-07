import { NextPage } from "next";
import Hero from "./Hero";
import Category from "./Category";
import SpeakerFeature from "./SpeakerFeature";
import About from "./About";

const Home: NextPage = () => {
  return (
    <main className="font-manrope min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      {/* Category Cards */}
      <Category />
      {/* Speaker Feature */}
      <SpeakerFeature />
      {/* About Section */}
      <About />
    </main>
  );
};

export default Home;
