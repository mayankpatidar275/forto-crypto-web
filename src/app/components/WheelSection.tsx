"use client";

import React from "react";
import { SpinCard } from "./ui/SpinCard";
// import SpinTheWheelCard from "./ui/SpinTheWheelCard";

const WheelSection = () => {
  const prizes = [
    "Free Coffee",
    "Prize Draw",
    "Sweets",
    "Gift Card",
    "Bonus Day Off",
    "Tech Gadget",
  ];
  return (
    <section className="cp-x cp-y flex justify-center">
      {/* <SpinTheWheelCard></SpinTheWheelCard> */}
      <SpinCard
        items={prizes}
        size={500}
        spinDuration={5000}
        onSpinEnd={(winner) => console.log("Winner:", winner)}
        buttonText="Spin to Win!"
      />
    </section>
  );
};

export default WheelSection;
