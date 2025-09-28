"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const HeroImageAnimation = () => {
  const rotatingImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!rotatingImageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(rotatingImageRef.current, {
        rotate: 180,
        duration: 10,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rotatingImageRef);

    return () => ctx.revert();
  }, []);

  return (
    <figure className="flex justify-center items-center w-full mb-10 relative overflow-hidden">
      <Image
        ref={rotatingImageRef}
        src="https://cdn.prod.website-files.com/67d94a83b4dcb2e406b897dc/67da95f00cef47fd93da39e5_Hero%20Cercale.png"
        alt=""
        role="presentation"
        aria-hidden="true"
        className="h-full max-w-full w-[275px] inline-block"
        loading="lazy"
        sizes="(max-width: 767px) 83vw, 500px"
        width={4000}
        height={4000}
        // style={{ height: "100%", width: "auto" }}
      />
    </figure>
  );
};

export default HeroImageAnimation;
