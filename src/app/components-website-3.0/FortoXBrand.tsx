import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Street, WhiteLogo } from "../assets";

function FortoXBrand() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div>
        <Image
          src={WhiteLogo}
          alt="Logo"
          className="h-5 sm:h-8 w-auto"
          width={150}
          height={50}
          priority
        />
      </div>
      <X />
      <div>
        <Image
          src={Street}
          alt="6thStreetLogo"
          className="h-5 sm:h-8 w-auto invert"
          width={150}
          height={50}
          priority
        />
      </div>
    </div>
  );
}

export default FortoXBrand;
