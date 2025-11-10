// components-website-3.0/ui/DrawsCarousel.tsx
"use client";

import React from "react";
import { useDraws } from "@/custom-hooks/queries";
import DrawCard, { DrawItem } from "./DrawCard";

export default function DrawsCarousel() {
  const { data: draws, isLoading, isError } = useDraws();

  const safeDraws = Array.isArray(draws)
    ? draws.filter(Boolean).filter((d) => d && d.event)
    : [];

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="cp-x cp-y my-12 lg:my-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-8 w-64 bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-gray-800 rounded mx-auto animate-pulse" />
          </div>

          <div className="flex gap-6 overflow-x-hidden pb-4 px-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-none w-80 bg-gray-900 rounded-2xl shadow-lg animate-pulse"
              >
                <div className="h-40 bg-gray-800 rounded-t-2xl" />
                <div className="p-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-800 rounded" />
                      <div className="h-4 bg-gray-800 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded" />
                    <div className="h-4 bg-gray-800 rounded w-5/6" />
                  </div>
                  <div className="h-2 bg-gray-800 rounded" />
                  <div className="flex justify-between">
                    <div className="w-20 h-8 bg-gray-800 rounded" />
                    <div className="w-24 h-10 bg-gray-800 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="cp-x cp-y my-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-900/20 border border-red-800 rounded-2xl p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-900 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Unable to Load Draws
            </h3>
            <p className="text-gray-400 mb-4">
              Please check your connection and try again
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!draws || safeDraws.length === 0) {
    return (
      <section className="cp-x cp-y my-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Active Draws
            </h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Check back later for exciting new giveaways and prizes!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cp-x cp-y my-12 lg:my-16 relative">
      {/* Background Glow Effects */}
      {/* <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl" /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text">
            Active Giveaways
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enter these exclusive draws for a chance to win amazing prizes from
            top brands
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <button
              className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-200 hover:shadow-lg z-20"
              onClick={() => {
                const container = document.getElementById("draws-carousel");
                if (container) {
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-200 hover:shadow-lg z-20"
              onClick={() => {
                const container = document.getElementById("draws-carousel");
                if (container) {
                  container.scrollBy({ left: 400, behavior: "smooth" });
                }
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Carousel */}
          <div
            id="draws-carousel"
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thumb-rounded-full px-4 lg:px-0"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#374151 #111827",
            }}
          >
            {/* Add left padding for first item and right padding for last item */}
            <div className="flex-none w-4 lg:w-8" />{" "}
            {/* Spacer for first item */}
            {safeDraws.map((draw: DrawItem) => (
              <DrawCard key={draw.id} draw={draw} />
            ))}
            <div className="flex-none w-4 lg:w-8" />{" "}
            {/* Spacer for last item */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
            <div className="w-2 h-2 bg-gray-600 rounded-full" />
            <div className="w-2 h-2 bg-brand-br rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
