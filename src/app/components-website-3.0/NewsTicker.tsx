"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { poppins } from "../layout";

interface NewsTickerProps {
  text: string;
  imageSrc: StaticImageData;
}

export default function NewsTicker({ text, imageSrc }: NewsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current) return;

    const tickerWidth = tickerRef.current.scrollWidth / 2; // since we duplicated content

    gsap.to(tickerRef.current, {
      x: -tickerWidth,
      duration: 70, // adjust speed here
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % -tickerWidth}px`,
      },
    });
  }, []);

  return (
    <div
      className={`hidden lg:flex w-full overflow-hidden bg-transparent ${poppins.className}`}
    >
      <div
        ref={tickerRef}
        className="flex items-center whitespace-nowrap text-white text-3xl sm:text-lg md:text-xl font-bold py-2 sm:py-4"
      >
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={76}
            height={76}
            className="inline-block shrink-0"
          />
          <span className="text-ticker">{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={76}
            height={76}
            className="inline-block shrink-0"
          />
          <span className="text-ticker">{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={76}
            height={76}
            className="inline-block shrink-0"
          />
          <span className="text-ticker">{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={76}
            height={76}
            className="inline-block shrink-0"
          />
          <span className="text-ticker">{text}</span>
        </div>
      </div>
    </div>
  );
}
