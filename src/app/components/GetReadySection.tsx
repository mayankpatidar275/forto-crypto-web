"use client";

import React, { useEffect, useRef } from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import gsap from "gsap";
import Image from "next/image";

const GetReadySection = () => {
  const rotatingImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (rotatingImageRef.current) {
      gsap.to(rotatingImageRef.current, {
        rotate: 180,
        duration: 10,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center lg:order-2">
          <Label text="GET READY" />
          <Heading2 className="lg:text-left">
            Stay Ahead of AI Innovations
          </Heading2>
          <Para1 className="lg:text-left">
            Join our exclusive newsletter for the latest breakthroughs, trends,
            and AI training insights.
          </Para1>
        </div>

        {/* Left Content */}
        <div className="flex flex-col items-center gap-6 lg:order-1">
          <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
            <Image
              ref={rotatingImageRef}
              src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
              alt="Rotating shape"
              width={800}
              height={600}
              sizes="(max-width: 767px) 83vw, 500px"
              className="h-full max-w-full w-auto inline-block"
              priority={false}
            />
          </figure>

          {/* Newsletter Form */}
          <form
            id="wf-form-Newsletter-Email"
            name="wf-form-Newsletter-Email"
            method="get"
            aria-label="Newsletter Email"
            className="flex flex-col items-center gap-4"
          >
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-[25rem] h-[4.38rem] px-4 py-3 text-sm text-link border-[1px] border-border bg-background-b3 rounded-[15px] focus:outline-none focus:ring-1 focus:ring-brand-br1 transition-all"
            />
            <input
              type="submit"
              value="Subscribe Now"
              data-wait="Please wait..."
              className="lg:self-start bg-gradient-to-br from-brand-br1 to-brand-br2 text-headin font-bold text-center px-8 py-4 rounded-[0.94rem] transition-all duration-400 ease-in-out transform hover:opacity-85 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetReadySection;
