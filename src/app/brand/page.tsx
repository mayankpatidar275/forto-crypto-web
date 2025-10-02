import ParticipationForm from "@/app/components-brand/ParticipationForm";
import Image from "next/image";
import React from "react";
import { Brand1 } from "../assets";
import TermsSection from "../components-website-3.0/TermsSection";
import TestimonialSection from "../components-website-3.0/TestimonialSection";

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
      <ParticipationForm></ParticipationForm>
      <TestimonialSection />
    </div>
  );
}

export default ParticipatePage;
