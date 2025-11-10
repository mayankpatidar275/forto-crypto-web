// components-website-3.0/ui/DrawCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
import { brandMeta, getBrandKeyFromBrand } from "@/app/data/brandMeta";
import CardCountDown from "./CardCountDown";

type Props = { draw: DrawItem };
type Brand = { id: string; name: string; website?: string };
type EventShape = {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};
export type DrawItem = {
  id: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  event: EventShape;
  brands: Brand[];
  firstBrand?: Brand | null;
};

export default function DrawCard({ draw }: Props) {
  if (!draw || !draw.event) return null;

  const brand = draw.firstBrand ?? (draw.brands && draw.brands[0]) ?? null;
  const brandId = brand?.id;
  const brandName = brand?.name;

  if (!brandId || !brandName) {
    return null;
  }

  const brandKey = getBrandKeyFromBrand(brand);
  const meta = brandMeta[brandKey] ?? brandMeta.default;

  const brandSlug = slugify(brandName);
  const eventSlug = slugify(draw.event.name ?? "event");
  const href = `/brands/${brandSlug}/events/${eventSlug}/draw/${draw.id}`;

  const isEndingSoon = () => {
    if (!draw.event.endDate && !draw.endDate) return false;
    const endDate = new Date(draw.endDate ?? draw.event.endDate ?? "");
    const now = new Date();
    const daysLeft =
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return daysLeft <= 2;
  };

  return (
    <article className="group flex-none w-[280px] sm:w-80 snap-start bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden hover:border-gray-600 mx-auto">
      {" "}
      {/* Header with Image */}
      <div className="relative h-40 w-full overflow-hidden">
        {meta.heroImage ? (
          <>
            <Image
              src={meta.heroImage}
              alt={`${meta.name} banner`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        ) : (
          <div
            className="h-full w-full flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                meta.gradientFrom && meta.gradientTo
                  ? `linear-gradient(135deg, var(--tw-gradient-stops)) ${meta.gradientFrom} ${meta.gradientTo}`
                  : "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="text-white font-bold text-xl relative z-10">
              {meta.name}
            </span>
          </div>
        )}

        {/* Urgent Badge */}
        {isEndingSoon() && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              Ending Soon!
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5">
        {/* Brand Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0">
            {meta.logo ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white ring-2 ring-white/20 shadow-lg">
                <Image
                  src={meta.logo}
                  alt={`${meta.name} logo`}
                  width={48}
                  height={48}
                  className="object-cover p-1 flex mt-1"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {meta.name?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg leading-tight text-white truncate">
              {draw.event.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  meta.dotColor || "bg-purple-400"
                }`}
              />
              <div className="text-sm text-gray-300 truncate">{brandName}</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {draw.event.description ||
            `Enter to win amazing prizes from ${meta.name}`}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Time remaining</span>
            <span>
              Ends{" "}
              {new Date(
                draw.endDate ?? draw.event.endDate ?? ""
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ${
                isEndingSoon()
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : "bg-gradient-to-r from-brand-br2 to-brand-br1"
              }`}
              style={{
                width: isEndingSoon() ? "15%" : "65%",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 mb-1">Ends in</span>
            <CardCountDown
              targetDate={draw.endDate ?? draw.event.endDate ?? ""}
              className="text-white"
            />
          </div>

          <Link
            href={href}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-br2 to-brand-br1 text-white font-semibold text-sm shadow-lg transform hover:scale-105 transition-all duration-200 hover:from-brand-br2 hover:to-brand-br1"
          >
            Enter Now
            <svg
              className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
