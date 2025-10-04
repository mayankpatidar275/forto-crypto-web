"use client";

import Image from "next/image";
import React from "react";
import { Brand1 } from "../assets";
import TermsSection from "../components-website-3.0/TermsSection";
import TestimonialSection from "../components-website-3.0/TestimonialSection";
import CountDown from "../components-website-3.0/ui/CountDown";
import Heading2 from "../components-website-3.0/ui/Heading2";
import { useEventById } from "@/custom-hooks/queries";
import ParticipationForm from "../components-website-3.0/ParticipationForm";

function ParticipatePage() {
  const {
    data: event,
    isLoading: isLoadingEvent,
    error,
  } = useEventById("386e4d08-0b04-45d5-9c1c-a4b675826f4e");

  if (isLoadingEvent) {
    return <div>Loading...</div>;
  }

  if (!event || !event.data || !event.data.status) {
    return <div>Event not found</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }
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
            <Heading2>Draw ends in</Heading2>
            <CountDown targetDate={event.data.endDate} />
          </div>
        </div>
      </section>
      <ParticipationForm></ParticipationForm>
      <TestimonialSection />
    </div>
  );
}

export default ParticipatePage;
