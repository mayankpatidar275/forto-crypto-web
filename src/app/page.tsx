// TODO: OPTI: lazy load if possible
import HeroSection from "./components-brand/HeroSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";

import HowSection from "./components/HowSection";
import VisionSection from "./components/VisionSection";
import WinnersSection from "./components/WinnersSection";
import CurrentGiveawaysSection from "./components/CurrentGiveawaysSection";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <CurrentGiveawaysSection />
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
