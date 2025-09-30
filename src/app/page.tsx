// TODO: OPTI: lazy load if possible

import { Rocket } from "./assets";
import BrandsTurnGiveaways from "./components-website-3.0/BrandsTurnGiveaways";
import CurrentGiveawaysSection from "./components-website-3.0/CurrentGiveawaysSection";
import CustomerWinMoreSection from "./components-website-3.0/CustomerWinMoreSection";
import FortoVsTraditional from "./components-website-3.0/FortoVsTraditional";
import HeroSection from "./components-website-3.0/HeroSection";
import NewsTicker from "./components-website-3.0/NewsTicker";
import TestimonialSection from "./components-website-3.0/TestimonialSection";
import ProblemSection from "./components/ProblemSection";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <NewsTicker imageSrc={Rocket} text="REVOLUTIONARY REWARDS PLATFORM" />
      <CurrentGiveawaysSection />
      <CustomerWinMoreSection />
      <FortoVsTraditional />
      <BrandsTurnGiveaways />
      <TestimonialSection />
      <ProblemSection />
    </div>
  );
}
