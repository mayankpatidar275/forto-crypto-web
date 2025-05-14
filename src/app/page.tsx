import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";
import GetReadySection from "./components/GetReadySection";
import HeroSection from "./components/HeroSection";
import ManifesteSection from "./components/ManifesteSection";
import ReadSection from "./components/ReadSection";
import ValuesSection from "./components/ValuesSection";
import WhatSection from "./components/WhatSection";
import WhySection from "./components/WhySection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <WhatSection />
      <WhySection />
      <GetNowSection />
      <GetReadySection />
      <ReadSection />
      <ContactSection />
      <AboutSection />
      <ManifesteSection />
      <ValuesSection />
    </div>
  );
}
