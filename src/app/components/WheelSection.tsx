"use client";

import React from "react";
// import SpinTheWheelCard from "./ui/SpinTheWheelCard";
import SpinCard from "./ui/SpinCard";

const WheelSection = () => {
  const handleSpinFinish = (winner: string) => {
    console.log("Winner:", winner);
    // Add your logic here
  };
  return (
    <section className="cp-x cp-y flex justify-center">
      {/* <SpinTheWheelCard></SpinTheWheelCard> */}
      <SpinCard
        segments={["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5"]}
        segColors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]}
        onFinished={handleSpinFinish}
        primaryColor="bg-indigo-600"
        contrastColor="text-white"
        buttonText="Spin Now!"
        isOnlyOnce={false}
        size={250}
        className="w-full max-w-md"
      />
    </section>
  );
};

export default WheelSection;
