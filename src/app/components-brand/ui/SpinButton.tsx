"use client";

import React, { useState } from "react";
import Link from "next/link";

const SpinButton = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpinning(true);
    // After animation completes, navigate to the spin page
    setTimeout(() => {
      window.location.href = "/spin-the-wheel";
    }, 800);
  };

  return (
    <Link href="/spin-the-wheel" onClick={handleSpinClick}>
      <button
        disabled={isSpinning}
        className={`
          relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center 
          bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
          text-white font-bold shadow-2xl
          transition-all duration-300 hover:scale-110
          ${isSpinning ? "animate-spin" : ""}
        `}
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #EC4899, #EF4444)",
          boxShadow: "0 0 20px rgba(219, 39, 119, 0.5)",
        }}
        aria-label="Spin the wheel"
      >
        {/* Outer ring with decorative elements */}
        <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-pulse"></div>

        {/* Inner circle */}
        <div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 
          flex items-center justify-center border-4 border-white/20"
        >
          {/* Shine effect */}
          <div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full 
            bg-white/10 blur-md"
          ></div>

          {/* Text */}
          <span className="relative z-10 text-center text-xs md:text-sm font-bold text-white drop-shadow-md">
            SPIN
          </span>
        </div>

        {/* Sparkle elements */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-400 
          animate-ping opacity-75"
        ></div>
        <div
          className="absolute -bottom-1 -left-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400 
          animate-ping opacity-75"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </button>
    </Link>
  );
};

export default SpinButton;
