"use client";

import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { brandMeta, BrandMeta } from "@/app/data/brandMeta";
import { WhiteLogo } from "../assets";

type FortoXBrandProps = {
  brandKey?: string;
  meta?: BrandMeta;
  partnerLogo?: string | StaticImageData;
};

type Particle = {
  left: string;
  top: string;
  delay: string;
  duration: string;
  size?: number;
  small?: boolean;
};

function randomPercent() {
  return `${(Math.random() * 100).toFixed(6)}%`;
}
function randomSec(min = 4, range = 3) {
  return `${(min + Math.random() * range).toFixed(6)}s`;
}

export default function FortoXBrand({
  brandKey,
  meta,
  partnerLogo,
}: FortoXBrandProps) {
  const m =
    meta ??
    (brandKey ? brandMeta[brandKey] ?? brandMeta.default : brandMeta.default);
  const partner = partnerLogo ?? m.logo ?? null;
  // const ourLogo = m.logo ?? null;

  // particles are generated client-side only to avoid SSR/client mismatch
  const [particles, setParticles] = useState<Particle[] | null>(null);
  const [smallParticles, setSmallParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    const p: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      left: randomPercent(),
      top: randomPercent(),
      delay: `${(i * 0.3).toFixed(6)}s`,
      duration: randomSec(4, 2),
    }));
    const sp: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      left: randomPercent(),
      top: randomPercent(),
      delay: `${(i * 0.7).toFixed(6)}s`,
      duration: randomSec(6, 3),
      small: true,
    }));
    setParticles(p);
    setSmallParticles(sp);
    // regenerate on every mount (ok)
  }, []);

  return (
    <div className="relative py-8 px-4">
      {/* render particles only after client mount */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        {particles?.map((pt, i) => (
          <div
            key={`p-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
            style={{
              left: pt.left,
              top: pt.top,
              width: pt.small ? 4 : 6,
              height: pt.small ? 4 : 6,
              animationDelay: pt.delay,
              animationDuration: pt.duration,
              opacity: 0.9,
            }}
          />
        ))}

        {smallParticles?.map((pt, i) => (
          <div
            key={`sp-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              left: pt.left,
              top: pt.top,
              width: 4,
              height: 4,
              animationDelay: pt.delay,
              animationDuration: pt.duration,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />

      <div className="relative z-10 text-center">
        <div className="mb-6">
          <span className="text-sm text-white/60 font-medium tracking-wide">
            Brought to you by
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="flex-1 max-w-[180px] sm:max-w-[200px] relative">
            <div className="relative group">
              <div className="absolute -inset-2 bg-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {partner ? (
                <Image
                  src={partner}
                  alt={`${m.name} logo`}
                  className="w-full h-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity relative z-10"
                  width={200}
                  height={60}
                  priority
                />
              ) : (
                <div className="h-12 flex items-center justify-center text-white/70">
                  Partner
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-sm" />
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 relative z-10" />
            </div>
          </div>

          <div className="flex-1 max-w-[160px] sm:max-w-[180px]">
            {WhiteLogo ? (
              <Image
                src={WhiteLogo}
                alt="Forto logo"
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                width={180}
                height={50}
                priority
              />
            ) : (
              <div className="h-12 flex items-center justify-center text-white/80">
                Forto
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-12px) translateX(4px) rotate(180deg);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
