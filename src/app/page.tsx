// TODO: OPTI: lazy load if possible

import { Rocket } from "./assets";
import BrandsTurnGiveaways from "./components-brand/BrandsTurnGiveaways";
import CustomerWinMoreSection from "./components-brand/CustomerWinMoreSection";
import HeaderBanner from "./components-brand/HeadingBanner";
import HeroSection from "./components-website-3.0/HeroSection";
import NewsTicker from "./components-website-3.0/NewsTicker";
import CurrentGiveawaysSection from "./components/CurrentGiveawaysSection";

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
