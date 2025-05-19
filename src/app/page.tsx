import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";
import GetReadySection from "./components/GetReadySection";
import HeroSection from "./components/HeroSection";
import HowSection from "./components/HowSection";
import ManifesteSection from "./components/ManifesteSection";
import NextDrawCounterSection from "./components/NextDrawCounterSection";
import PeopleSection from "./components/PeopleSection";
import ProblemSection from "./components/ProblemSection";
import ReadSection from "./components/ReadSection";
import ValuesSection from "./components/ValuesSection";
import VisionSection from "./components/VisionSection";
import WhatSection from "./components/WhatSection";
import WhySection from "./components/WhySection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <NextDrawCounterSection />
      <HowSection />
      <VisionSection />
      <GetNowSection />
      <ProblemSection />
      <ContactSection />
      <WhatSection />
      <WhySection />
      <GetReadySection />
      <ReadSection />
      <AboutSection />
      <ManifesteSection />
      <ValuesSection />
      <PeopleSection />
    </div>
  );
}
