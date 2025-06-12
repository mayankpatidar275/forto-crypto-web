"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Label from "./ui/Label";
import Para1 from "./ui/Para1";
import Image from "next/image";

function HeroSection({ scrollToBuy }: { scrollToBuy: () => void }) {
  const rotatingImageRef = useRef(null);

  useEffect(() => {
    if (rotatingImageRef.current) {
      gsap.to(rotatingImageRef.current, {
        rotate: 180, // rotate clockwise
        duration: 10,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1, // infinite loop
      });
    }
  }, []);

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
          <button
            onClick={scrollToBuy}
            className="inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Buy Now
          </button>
        </div>

        <figure
          ref={rotatingImageRef}
          className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden"
        >
          <Image
            src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
            alt=""
            className="h-full max-w-full w-auto inline-block"
            loading="lazy"
            sizes="(max-width: 767px) 83vw, 500px"
            width={4000}
            height={4000}
            style={{ height: "100%", width: "auto" }}
          />
        </figure>
      </div>
    </section>
  );
}

export default HeroSection;
