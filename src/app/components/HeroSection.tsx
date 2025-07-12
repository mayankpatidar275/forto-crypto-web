import Label from "./ui/Label";
import Para1 from "./ui/Para1";
import BuyNowBtnHero from "./ui/BuyNowBtnHero";
import HeroImageAnimation from "./ui/HeroImageAnimation";

const HeroSection = () => {
  return (
    <section className="section-hero cp-x">
      <div className="mt-2 md:mt-6">
        <div className="block-heading px-6 py-14 text-center flex flex-col items-center">
          <Label text="Blockchain. Transparent. Fun." />

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-heading to-brand-br1 leading-tight mb-6 max-w-5xl">
            Multiple Sweepstakes Draws with 1 NFT Ticket
          </h1>

          <div className="mb-8">
            <Para1>
              One Ticket. Higher probability to win. Hold, trade, and win in our
              long-term sweepstakes
            </Para1>
            <Para1 className="hidden sm:block">
              — where jackpots grow bigger, rewards go deeper, and every ticket
              brings you closer to massive payouts. 🚀💰
            </Para1>
          </div>

          <BuyNowBtnHero />
        </div>

        <HeroImageAnimation />
      </div>
    </section>
  );
};

export default HeroSection;
