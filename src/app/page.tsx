"use client";
import { useRef } from "react";
// TODO: OPTI: lazy load if possible
import ContactSection from "./components/ContactSection";
import GetNowSection from "./components/GetNowSection";
import HeroSection from "./components/HeroSection";
import HowSection from "./components/HowSection";
import NextDrawCounterSection from "./components/NextDrawCounterSection";
import VisionSection from "./components/VisionSection";
import WinnersSection from "./components/WinnersSection";

export default function Home() {
  const buySectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToBuy = () => {
    if (buySectionRef.current) {
      buySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="">
      <HeroSection scrollToBuy={scrollToBuy} />
      <NextDrawCounterSection scrollToBuy={scrollToBuy} />
      <div ref={buySectionRef}>
        <GetNowSection />
      </div>
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
