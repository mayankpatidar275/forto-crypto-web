"use client";

import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";

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
      duration: 20, // adjust speed here
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % -tickerWidth}px`,
      },
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-brand-br font-roboto">
      <div
        ref={tickerRef}
        className="flex items-center whitespace-nowrap text-white text-base sm:text-lg md:text-xl font-bold py-2 sm:py-4"
      >
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={36}
            height={36}
            className="inline-block shrink-0"
          />
          <span>{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={36}
            height={36}
            className="inline-block shrink-0"
          />
          <span>{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={36}
            height={36}
            className="inline-block shrink-0"
          />
          <span>{text}</span>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <Image
            src={imageSrc}
            alt="Ticker Icon"
            width={36}
            height={36}
            className="inline-block shrink-0"
          />
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
