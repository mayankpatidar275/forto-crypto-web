// TODO: OPTI: lazy load if possible
import HeroSection from "./components-brand/HeroSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";

import HowSection from "./components/HowSection";
import VisionSection from "./components/VisionSection";
import WinnersSection from "./components/WinnersSection";
import CurrentGiveawaysSection from "./components/CurrentGiveawaysSection";
import CustomerWinMoreSection from "./components-brand/CustomerWinMoreSection";
import NewsTicker from "./components-brand/NewsTicker";
import { Rocket } from "./assets";
import BrandsTurnGiveaways from "./components-brand/BrandsTurnGiveaways";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <NewsTicker
        text="FIRST REVOLUTIONARY REWARDS PROGRAM FOR BRANDS ON BLOCKCHAIN"
        imageSrc={Rocket}
      />
      <HeroSection />
      <CurrentGiveawaysSection />
      <CustomerWinMoreSection />
      <BrandsTurnGiveaways />
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
