// components-website-3.0/BrandShowcaseSection.tsx
"use client";

import { brandMeta } from "@/app/data/brandMeta";
import Image from "next/image";
import { useState } from "react";
import Heading2 from "./Heading2";

export default function BrandShowcaseSection() {
  const [activeBrand, setActiveBrand] = useState<string>("styli");

  const brands = Object.values(brandMeta).filter(
    (brand) => brand.key !== "default"
  );

  return (
    <section className="cp-x cp-y my-20 lg:my-28 relative overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/10 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col justify-center items-center">
          <Heading2 className="text-center w-auto flex justify-center">
            Our Premium Partners
          </Heading2>
          <p className="text-center">
            Collaborating with industry leaders to bring you exclusive giveaways
            and unforgettable experiences
          </p>
        </div>

        {/* Brand Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {brands.map((brand) => (
            <button
              key={brand.key}
              onClick={() => setActiveBrand(brand.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                activeBrand === brand.key
                  ? "bg-gradient-to-r from-brand-br1 to-brand-br border-transparent text-white shadow-lg"
                  : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Brand Showcase Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {brands.map((brand) => (
            <div
              key={brand.key}
              className={`space-y-8 transition-all duration-500 ${
                activeBrand === brand.key
                  ? "block opacity-100 translate-y-0"
                  : "hidden opacity-0 translate-y-4"
              }`}
            >
              {/* Brand Header */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-3">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {brand.name.slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-700 rounded-full flex items-center justify-center border-4 border-[#15100c]">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {brand.name}
                  </h3>
                  <p className="text-gray-400 text-lg">{brand.tagline}</p>
                </div>
              </div>

              {/* Brand Description */}
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  We&apos;re proud to partner with {brand.name} to bring
                  exclusive giveaways and premium experiences to our community.
                  {brand.name} shares our commitment to quality and customer
                  satisfaction.
                </p>

                {/* Partnership Badge */}
                <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-6">
                  <div className="flex items-center gap-2">
                    {/* <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div> */}
                    <span className="text-white font-semibold">
                      Forto Partner
                    </span>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <span className="text-green-400 text-sm font-medium">
                    Active Collaboration
                  </span>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-3">
                {brand.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex-shrink-0" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              {/* <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/brands/${brand.key}`}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  View Giveaways
                </Link>
                <button className="px-6 py-3 border-2 border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-gray-600 hover:text-white transition-all duration-300">
                  Visit Website
                </button>
              </div> */}
            </div>
          ))}

          {/* Visual Showcase - Right Side */}
          <div className="relative">
            {brands.map((brand) => (
              <div
                key={brand.key}
                className={`transition-all duration-500 ${
                  activeBrand === brand.key
                    ? "block opacity-100 scale-100"
                    : "hidden opacity-0 scale-95"
                }`}
              >
                {/* Main Brand Visual */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
                  {brand.heroImage ? (
                    <Image
                      src={brand.heroImage}
                      alt={`${brand.name} showcase`}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-64 flex items-center justify-center"
                      style={{
                        background:
                          brand.gradientFrom && brand.gradientTo
                            ? `linear-gradient(135deg, ${brand.gradientFrom}, ${brand.gradientTo})`
                            : "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      <span className="text-white text-2xl font-bold">
                        {brand.name}
                      </span>
                    </div>
                  )}

                  {/* Overlay Content */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-bold text-lg">
                            Active Partnership
                          </h4>
                          <p className="text-gray-300 text-sm">Live draws</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-lg">
                            Live
                          </div>
                          <div className="text-gray-400 text-xs">
                            Giveaways Active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Mini Stats */}
                {/* <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">5+</div>
                    <div className="text-gray-400 text-sm">Campaigns</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      1.2k+
                    </div>
                    <div className="text-gray-400 text-sm">Participants</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      98%
                    </div>
                    <div className="text-gray-400 text-sm">Satisfaction</div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Value Proposition */}
        {/* <div className="mt-20 text-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Strategic Brand Partnerships
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
              We carefully select brands that align with our values and deliver
              exceptional value to our community. Each partnership is built on
              trust, transparency, and mutual success.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Verified Brands
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Secure Partnerships
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                Exclusive Offers
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
