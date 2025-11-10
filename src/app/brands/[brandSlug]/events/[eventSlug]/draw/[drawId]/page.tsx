// src/app/brand/[brandId]/event/[eventId]/draw/[drawId]/page.tsx
"use client";

import AboutBrandSection from "@/app/components-website-3.0/AboutBrandSection";
import FortoXBrand from "@/app/components-website-3.0/FortoXBrand";
import ParticipationForm from "@/app/components-website-3.0/ParticipationForm";
import TermsSection from "@/app/components-website-3.0/TermsSection";
import BrandScreenshotsCarousel from "@/app/components-website-3.0/ui/BrandScreenshotsCarousel";
import CountDown from "@/app/components-website-3.0/ui/CountDown";
import Heading2 from "@/app/components-website-3.0/ui/Heading2";
import Loader from "@/app/components-website-3.0/ui/Loader";
import { brandMeta, getBrandKeyFromBrand } from "@/app/data/brandMeta";
import { useDraw } from "@/custom-hooks/queries";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

type Brand = { id: string; name?: string; website?: string };
type EventShape = {
  id: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
};
export type DrawPayload = {
  id: string;
  roundNumber?: number;
  coinsAllocated?: number;
  startDate?: string;
  endDate?: string;
  event: EventShape | null;
  brands: Brand[];
  firstBrand?: Brand | null;
};

export default function DrawPage() {
  const {
    brandId: routeBrandId,
    eventId: routeEventId,
    drawId,
  } = useParams() as {
    brandId: string;
    eventId: string;
    drawId: string;
  };
  const { isLoaded } = useUser();

  const { data: draw, isLoading, isError } = useDraw(drawId);

  console.log("draw: ", draw);

  if (isLoading || !isLoaded) {
    return (
      <div className="flex justify-center items-center mt-30">
        <Loader />
      </div>
    );
  }

  if (!draw || !draw.event || isError) {
    return (
      <div className="flex justify-center items-center mt-30">
        Oops! Something went wrong.
      </div>
    );
  }

  // determine brand source: prefer backend firstBrand, then brands array, else route param
  const backendBrand =
    draw.firstBrand ?? (draw.brands && draw.brands[0]) ?? null;

  // try to map to brandMeta key
  const brandKey = getBrandKeyFromBrand(
    backendBrand ?? { id: routeBrandId, name: routeBrandId }
  );
  const meta = brandMeta[brandKey] ?? brandMeta.default;

  return (
    <div className="cp-y">
      <section className="cp-x cp-y mt-10">
        <FortoXBrand brandKey={brandKey} meta={meta} />
      </section>

      <AboutBrandSection
        brandName={meta.name}
        tagline={meta.tagline}
        features={meta.features}
        backgroundColor="p-8 bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl w-full shadow-2xl"
        dotColor={meta.dotColor ?? "bg-purple-400"}
        gradientFrom={meta.gradientFrom ?? "from-purple-400"}
        gradientTo={meta.gradientTo ?? "to-pink-400"}
      />

      <section className="cp-x cp-y flex justify-center">
        <div className="max-w-6xl">
          <div className="flex flex-col items-center gap-4 h-full justify-center">
            <Heading2>Draw ends in</Heading2>
            <CountDown targetDate={draw.endDate ?? draw.event.endDate ?? ""} />
          </div>
        </div>
      </section>

      {/* pass the ids to the form */}
      <ParticipationForm
        drawId={draw.id}
        brandId={backendBrand?.id ?? routeBrandId}
        eventId={draw.event.id ?? routeEventId}
      />

      <TermsSection />

      <BrandScreenshotsCarousel
        brandKey={brandKey}
        durationSeconds={22}
        altBase={`${meta.name} screenshot`}
      />
    </div>
  );
}
