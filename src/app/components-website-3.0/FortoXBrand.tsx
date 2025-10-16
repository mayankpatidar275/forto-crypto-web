import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Street, WhiteLogo } from "../assets";

function FortoXBrand() {
  return (
    <div className="relative py-8 px-4">
      {/* Smooth Particle Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Additional smaller particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Collaboration Label */}
        <div className="mb-6">
          <span className="text-sm text-white/60 font-medium tracking-wide">
            Brought to you by
          </span>
        </div>

        {/* Logos */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {/* Street Brand - Slightly Larger */}
          <div className="flex-1 max-w-[180px] sm:max-w-[200px] relative">
            <div className="relative group">
              {/* Subtle highlight effect on Street */}
              <div className="absolute -inset-2 bg-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={Street}
                alt="6thStreetLogo"
                className="w-full h-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity relative z-10"
                width={200}
                height={60}
                priority
              />
            </div>
          </div>

          {/* Simple X Connector */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-full blur-sm" />
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 relative z-10" />
            </div>
          </div>

          {/* Your Website Brand */}
          <div className="flex-1 max-w-[160px] sm:max-w-[180px]">
            <Image
              src={WhiteLogo}
              alt="Logo"
              className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
              width={180}
              height={50}
              priority
            />
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) translateX(5px) rotate(180deg);
            opacity: 0.8;
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) translateX(-3px);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default FortoXBrand;
