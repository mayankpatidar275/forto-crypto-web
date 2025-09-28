import React from "react";
import { Star } from "lucide-react";
// import Image from "next/image";

type TestimonialCardProps = {
  // avatar?: string; // user profile image
  name: string;
  // address: string;
  testimonial: string;
  rating?: number; // default 5
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  // avatar,
  name,
  // address,
  testimonial,
  rating = 5,
}) => {
  return (
    <div className="p-6 bg-background-b4 rounded-2xl w-full max-w-md shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        /> */}
        <div>
          <p className="font-semibold text-lg text-white">{name}</p>
          {/* <p className="text-sm text-gray-400">{address}</p> */}
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Content */}
      <div>
        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={18} className="text-brand-br fill-brand-br" />
          ))}
        </div>
        {/* Testimonial */}
        <p className="text-gray-300 leading-relaxed">{testimonial}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
