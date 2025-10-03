import ParticipationForm from "@/app/components-brand/ParticipationForm";
import Image from "next/image";
import React from "react";
import { Brand1 } from "../assets";
import TermsSection from "../components-website-3.0/TermsSection";
import TestimonialSection from "../components-website-3.0/TestimonialSection";
import CountDown from "../components-website-3.0/ui/CountDown";
import Heading2 from "../components-website-3.0/ui/Heading2";

function ParticipatePage() {
  return (
    <div className="cp-y">
      <figure className="flex justify-center items-center w-full mb-10 relative overflow-hidden">
        <Image
          src={Brand1}
          alt=""
          role="presentation"
          aria-hidden="true"
          className="h-full max-w-full w-auto inline-block"
          loading="lazy"
          // sizes="(max-width: 767px) 83vw, 500px"
          width={4000}
          height={4000}
          style={{ height: "100%", width: "auto" }}
        />
      </figure>
      <TermsSection />
      <section className="cp-x cp-y flex justify-center">
        <div className="max-w-6xl">
          {/* Right Content */}
          <div className="flex flex-col items-center gap-4 h-full justify-center">
            {/* <Label text="About us" /> */}
            <Heading2>Join Soon</Heading2>
            <CountDown targetDate="2025-12-31T23:59:59" />
          </div>
        </div>
      </section>
      <ParticipationForm></ParticipationForm>
      <TestimonialSection />
    </div>
  );
}

export default ParticipatePage;
