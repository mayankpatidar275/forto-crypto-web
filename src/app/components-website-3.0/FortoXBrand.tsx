import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Street, WhiteLogo } from "../assets";

function FortoXBrand() {
  return (
    <div className="relative py-8 px-4">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-2xl" />
      </div>

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
          <div className="flex-1 max-w-[180px] sm:max-w-[200px]">
            <Image
              src={Street}
              alt="6thStreetLogo"
              className="w-full h-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              width={200}
              height={60}
              priority
            />
          </div>

          {/* Simple X Connector */}
          <div className="flex-shrink-0">
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
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
    </div>
  );
}

export default FortoXBrand;
