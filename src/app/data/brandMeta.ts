// src/app/data/brandMeta.ts
import { StaticImageData } from "next/image";
import {
  SixthStreetHero,
  SixthStreetLogo,
  SixthStreetSS1,
  StyliHero,
  StyliLogo,
  StyliSS1,
  StyliSS2,
  StyliSS3,
  StyliSS4,
} from "../assets";

export type BrandMeta = {
  key: string; // mapping key (slug / brand id)
  name: string;
  tagline?: string;
  features: { text: string }[];
  logo?: StaticImageData | string;
  heroImage?: StaticImageData | string;
  screenshots?: (StaticImageData | string)[];
  dotColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
};

export const brandMeta: Record<string, BrandMeta> = {
  styli: {
    key: "styli",
    name: "StyliShop",
    tagline: "🛍️",
    features: [
      { text: "1000+ international & local brands" },
      { text: "Fashion, electronics, home & lifestyle" },
      { text: "Free shipping across UAE" },
      { text: "Easy returns & exchanges" },
      { text: "Secure payment options" },
      { text: "24/7 customer support" },
    ],
    logo: StyliLogo,
    heroImage: StyliHero,
    screenshots: [StyliSS1, StyliSS2, StyliSS3, StyliSS4],
    dotColor: "bg-purple-400",
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-400",
  },

  "6thstreet": {
    key: "6thstreet",
    name: "6thStreet.com",
    tagline: "🎉",
    features: [
      { text: "2000+ international brands" },
      { text: "Fashion, beauty, home & more" },
      { text: "Valid across UAE, KSA & Oman" },
      { text: "Direct credits to your account" },
    ],
    logo: SixthStreetLogo,
    heroImage: SixthStreetHero,
    screenshots: [SixthStreetSS1],
    dotColor: "bg-blue-400",
    gradientFrom: "from-blue-400",
    gradientTo: "to-indigo-400",
  },

  testbrand: {
    key: "testbrand",
    name: "Test Brand",
    tagline: "✨",
    features: [
      { text: "Test 1. 1000+ international & local brands" },
      { text: "Test 2, Fashion, electronics, home & lifestyle" },
      { text: "Free shipping across UAE" },
      { text: "Easy returns & exchanges" },
      { text: "Secure payment options" },
      { text: "24/7 customer support" },
    ],
    logo: StyliLogo,
    heroImage: StyliHero,
    dotColor: "bg-purple-400",
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-400",
  },

  // default / fallback meta (use when brand not known)
  default: {
    key: "default",
    name: "Our Partner",
    tagline: "🎁",
    features: [
      { text: "Participate to win rewards" },
      { text: "Transparent draws" },
      { text: "Fast payouts" },
    ],
    screenshots: [],
    logo: "",
    heroImage: "",
    dotColor: "bg-gray-400",
    gradientFrom: "from-gray-400",
    gradientTo: "to-gray-600",
  },
};

/**
 * helper to find mapping key from brand object returned by backend
 * prefer slug if you store it, else try normalized name -> lowercase no-spaces
 */
export function getBrandKeyFromBrand(brand?: { id?: string; name?: string }) {
  if (!brand) return "default";
  // if you want to match brand.id or privyId, do that here:
  if (!brand.name) return "default";
  const key = brand.name.toLowerCase().replace(/\s+/g, "");
  // allow specific mappings by id or slug if you prefer:
  if (brandMeta[key]) return key;
  // try numeric/uuid id mapping (if you used brand.id as key)
  if (brand.id && brandMeta[brand.id]) return brand.id;
  return "default";
}
