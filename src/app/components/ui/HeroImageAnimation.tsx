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
        src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
        alt=""
        role="presentation"
        aria-hidden="true"
        className="h-full max-w-full w-auto inline-block"
        loading="lazy"
        sizes="(max-width: 767px) 83vw, 500px"
        width={4000}
        height={4000}
        style={{ height: "100%", width: "auto" }}
      />
    </figure>
  );
};

export default HeroImageAnimation;
