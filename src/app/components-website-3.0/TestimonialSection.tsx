"use client";

import Heading4 from "./ui/Heading4";
import TestimonialCard from "./ui/TestimonialCard";

const testimonials = [
  {
    // avatar: "/avatar1.jpg",
    name: "Brand",
    // address: "San Francisco, USA",
    testimonial:
      "We saw a surge of new customers, and only paid when they shopped.",
  },
  {
    // avatar: "/avatar2.jpg",
    name: "Customer",
    // address: "London, UK",
    testimonial: "I actually won on my first try. Finally fair.",
  },
  {
    // avatar: "/avatar3.jpg",
    name: "Brand",
    // address: "Milan, Italy",
    testimonial: "Best giveaway ROI we've had.",
  },
  {
    // avatar: "/avatar3.jpg",
    name: "Customer",
    // address: "Milan, Italy",
    testimonial: "I won and used it same day.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center testimonial-section">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left side heading */}
        <div className="flex flex-col items-center lg:items-end gap-4 h-full justify-center">
          <Heading4 className="uppercase text-center lg:text-right">
            What customers and brands are saying about us
          </Heading4>
        </div>

        {/* Right side marquee */}
        <div className="relative h-[500px] overflow-hidden">
          {/* Glow overlays */}
          {/* <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background-b4 to-transparent z-10" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background-b4 to-transparent z-10" /> */}

          {/* Scrolling container */}
          <div className="animate-marquee-vertical flex flex-col gap-6">
            {testimonials.concat(testimonials).map((t, idx) => (
              <TestimonialCard
                key={idx}
                // avatar={t.avatar}
                name={t.name}
                // address={t.address}
                testimonial={t.testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
