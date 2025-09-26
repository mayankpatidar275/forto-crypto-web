"use client";

import Image from "next/image";

interface HeaderBannerProps {
  title: string;
  imageSrc?: string;
}

export default function HeaderBanner({ title, imageSrc }: HeaderBannerProps) {
  return (
    <div className="w-full bg-brand-br font-roboto flex justify-center">
      <div className="flex items-center gap-4 text-white text-lg sm:text-2xl md:text-4xl font-semibold py-4 px-4">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Header Icon"
            width={28}
            height={28}
            className="inline-block shrink-0"
          />
        )}
        <span>{title}</span>
      </div>
    </div>
  );
}
