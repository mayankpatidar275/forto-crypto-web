// TODO: OPTI: lazy load if possible
import HeroSection from "./components-brand/HeroSection";

import { Rocket } from "./assets";
import BrandsTurnGiveaways from "./components-brand/BrandsTurnGiveaways";
import CustomerWinMoreSection from "./components-brand/CustomerWinMoreSection";
import HeaderBanner from "./components-brand/HeadingBanner";
import NewsTicker from "./components-brand/NewsTicker";
import CurrentGiveawaysSection from "./components/CurrentGiveawaysSection";

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
      <div className="cp-y flex justify-center">
        <HeaderBanner title="FORTO vs TRADITIONAL GIVEAWAYS" />
      </div>
    </div>
  );
}
