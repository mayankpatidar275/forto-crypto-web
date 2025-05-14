import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";
import GetReadySection from "./components/GetReadySection";
import HeroSection from "./components/HeroSection";
import ReadSection from "./components/ReadSection";
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
    </div>
  );
}
