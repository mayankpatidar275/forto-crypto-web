import Para1 from "./ui/Para1";
import BuyNowBtnHero from "./ui/BuyNowBtnHero";
import HeroImageAnimation from "./ui/HeroImageAnimation";

const HeroSection = () => {
  return (
    <section className="section-hero cp-x hero-section bg-url[]">
      <div className="mt-2 md:mt-6">
        <div className="block-heading px-6 py-14 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-br bg-clip-text leading-tight mb-6 max-w-5xl">
            50% WINNERS & 100% FAIR
          </h1>
          <BuyNowBtnHero />
        </div>
        <div>
          <HeroImageAnimation />
          <div className="mb-8">
            <Para1>
              The first blockchain powered giveaway where 50% customers win
              rewards and brands only pay when customers shop
            </Para1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
