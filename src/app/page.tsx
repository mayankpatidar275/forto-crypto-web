import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";
import HeroSection from "./components/HeroSection";
import HowSection from "./components/HowSection";
import NextDrawCounterSection from "./components/NextDrawCounterSection";
import VisionSection from "./components/VisionSection";
import WinnersSection from "./components/WinnersSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <NextDrawCounterSection />
      <GetNowSection />
      <WinnersSection />
      <HowSection />
      <VisionSection />
      {/* product roadmap */}
      {/* <ProblemSection /> */}
      <ContactSection />
      {/* <WhatSection />
      <WhySection />
      <GetReadySection />
      <ReadSection />
      <AboutSection />
      <ManifesteSection />
      <ValuesSection />
      <PeopleSection /> */}
    </div>
  );
}
