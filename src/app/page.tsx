// TODO: OPTI: lazy load if possible

import { Rocket } from "./assets";
import HeaderBanner from "./components-brand/HeadingBanner";
import BrandsTurnGiveaways from "./components-website-3.0/BrandsTurnGiveaways";
import CurrentGiveawaysSection from "./components-website-3.0/CurrentGiveawaysSection";
import CustomerWinMoreSection from "./components-website-3.0/CustomerWinMoreSection";
import HeroSection from "./components-website-3.0/HeroSection";
import NewsTicker from "./components-website-3.0/NewsTicker";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <NewsTicker
        imageSrc={Rocket}
        text="FIRST REVOLUTIONARY REWARDS PROGRAM FOR BRANDS ON BLOCKCHAIN"
      />
      <CurrentGiveawaysSection />
      <CustomerWinMoreSection />
      <BrandsTurnGiveaways />
      <div className="cp-y flex justify-center">
        <HeaderBanner title="FORTO vs TRADITIONAL GIVEAWAYS" />
      </div>
    </div>
  );
}
