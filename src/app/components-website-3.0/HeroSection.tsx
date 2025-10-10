import Para1 from "./ui/Para1";
import BuyNowBtnHero from "./ui/BuyNowBtnHero";
import HeroImageAnimation from "./ui/HeroImageAnimation";
import { funnel } from "../layout";
import NewsTicker from "./NewsTicker";
import { Rocket } from "../assets";

const HeroSection = () => {
  return (
    <section className="section-hero cp-x hero-section">
      <div className="md:mt-6">
        <div className="block-heading px-6 py-6 text-center flex flex-col items-center">
          <h1
            className={`${funnel.className} text-4xl md:text-6xl lg:text-7xl font-bold text-white lg:text-background bg-clip-text leading-tight mb-6 max-w-5xl`}
          >
            Next-Level Rewards, Powered by Blockchain
          </h1>
          <BuyNowBtnHero />
        </div>
        <div>
          <HeroImageAnimation />
          <div className="mb-8 flex justify-center">
            <Para1>
              Innovative, transparent draws that give brands real engagement and
              customers guaranteed excitement.
            </Para1>
          </div>
        </div>
      </div>
      <NewsTicker imageSrc={Rocket} text="REVOLUTIONARY REWARDS PLATFORM" />
    </section>
  );
};

export default HeroSection;
