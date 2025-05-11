"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function HeroSection() {
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
      <div className="mt-6">
        <div className="block-heading px-6 py-14 text-center flex flex-col items-center">
          <div className="border-2 block w-fit tracking-widest border-background-b1 text-brand-br1 uppercase rounded-xl mt-0 mb-4 p-2.5 px-4 text-sm leading-snug">
            AI TRAINER MODELS SOLUTION
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-heading to-brand-br1 leading-tight mb-6 max-w-5xl">
            Unlock the Full Potential of Your AI Models
          </h1>

          <p className="text-lg md:text-xl text-link font-semibold max-w-3xl mx-auto mb-8">
            We develop cutting-edge AI training models to accelerate your
            innovation. Smarter, faster, and more efficient AI starts here.
          </p>
          <a
            href="/contact"
            className="inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Get Started
          </a>
        </div>

        <figure className="flex flex-col justify-center items-center w-full mb-10 relative overflow-hidden">
          <img
            ref={rotatingImageRef}
            src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
            alt=""
            className="h-full max-w-full w-auto inline-block"
            loading="lazy"
            sizes="(max-width: 767px) 83vw, 500px"
            srcSet="
              https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min-p-500.avif 500w,
              https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min-p-800.avif 800w,
              https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min-p-1080.avif 1080w,
              https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min-p-1600.avif 1600w,
              https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif 4000w"
          />
        </figure>
      </div>
    </section>
  );
}

export default HeroSection;
