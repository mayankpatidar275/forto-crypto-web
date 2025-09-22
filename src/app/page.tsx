// TODO: OPTI: lazy load if possible
import HeroSection from "./components-brand/HeroSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";

import HowSection from "./components/HowSection";
import NextDrawCounterSection from "./components/NextDrawCounterSection";
import VisionSection from "./components/VisionSection";
import WinnersSection from "./components/WinnersSection";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <NextDrawCounterSection />
      <GetNowSection
        eventName="Italian-Brainrot"
        heading="Get your unique NFT ticket now"
      />
      <WinnersSection />
      <HowSection />
      <VisionSection />
      <ContactSection />
    </div>
  );
}
