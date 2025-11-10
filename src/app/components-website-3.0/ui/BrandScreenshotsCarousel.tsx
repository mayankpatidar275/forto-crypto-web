// src/app/components-website-3.0/ui/BrandScreenshotsCarousel.tsx
"use client";

import React, { useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import { brandMeta } from "@/app/data/brandMeta";

type Props = {
  brandKey?: string;
  images?: (string | StaticImageData)[];
  /** autoplay speed (seconds for one loop) */
  durationSeconds?: number;
  /** optional alt base text */
  altBase?: string;
  className?: string;
};

export default function BrandScreenshotsCarousel({
  brandKey,
  images,
  durationSeconds = 20,
  altBase = "brand screenshot",
  className = "",
}: Props) {
  // pick images (explicit prop wins)
  const metaImages = useMemo(() => {
    if (images && images.length > 0) return images;
    if (brandKey && brandMeta[brandKey]?.screenshots)
      return brandMeta[brandKey]!.screenshots!;
    return [];
  }, [images, brandKey]);

  if (!metaImages || metaImages.length === 0) return null;

  // For a smooth seamless marquee:
  // - Duplicate the set once (original + original) which allows translateX(-50%) to loop cleanly.
  // - If there's only 1 image, duplicate it a few times so it feels continuous (no gaps).
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dup = useMemo(() => {
    if (metaImages.length === 1) {
      // repeat the single image so the track is long enough
      return Array.from({ length: 6 }).flatMap(() => metaImages);
    }
    return [...metaImages, ...metaImages];
  }, [metaImages]);

  // CSS variable for animation duration (deterministic)
  const style: React.CSSProperties = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["--duration" as any]: `${durationSeconds}s`,
  };

  return (
    <section
      className={`cp-x cp-y my-10 ${className}`}
      aria-label="Brand screenshots"
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop marquee (auto-play) */}
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={style}
        >
          <div
            // desktop autoplay marquee: visible from md and up
            className="marquee-track hidden md:flex items-center gap-4 py-6 pl-2"
            style={{ animationDuration: `var(--duration)` }}
            role="list"
          >
            {dup.map((img, i) => (
              <div
                key={`m-${i}`}
                className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-white/5"
                role="listitem"
                // responsive widths/heights: larger on larger screens
                // w-72 (288px) on md, w-96 (384px) on lg
              >
                <div className="w-72 h-40 md:w-80 md:h-48 lg:w-96 lg:h-56">
                  <Image
                    src={img}
                    alt={`${altBase} ${(i % metaImages.length) + 1}`}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                    sizes="(min-width:1024px) 384px, (min-width:768px) 320px, 280px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: manual horizontal scroller (no autoplay) */}
          <div
            className="md:hidden overflow-x-auto flex gap-4 py-2 px-1 scrollbar-hide snap-x"
            role="list"
          >
            {metaImages.map((img, i) => (
              <div
                key={`s-${i}`}
                className="flex-none w-64 h-44 rounded-xl overflow-hidden shadow-sm snap-center"
                role="listitem"
              >
                <Image
                  src={img}
                  alt={`${altBase} ${i + 1}`}
                  width={640}
                  height={440}
                  className="object-cover w-full h-full"
                  sizes="80vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* marquee: translate the track left by half (works when dup = original + original) */
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: max-content;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
          will-change: transform;
        }

        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* keep the marquee visually smooth */
        .marquee-track > div {
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Hide autoplay marquee on very small screens (mobile uses manual scroller) */
        @media (max-width: 767px) {
          .marquee-track {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
