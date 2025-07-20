"use client";

import React from "react";
// import SpinTheWheelCard from "./ui/SpinTheWheelCard";
import SpinCard from "./ui/SpinCard";

const WheelSection = () => {
  // const handleSpinFinish = (winner: string) => {
  //   console.log("Winner:", winner);
  //   // Add your logic here
  // };
  return (
    <section className="cp-x cp-y flex justify-center">
      {/* <SpinTheWheelCard></SpinTheWheelCard> */}
      <SpinCard
        title="Prize Wheel"
        subtitle="Spin for your chance to win"
        segments={[
          "Coffee",
          "10% Off",
          "Dessert",
          "20% Off",
          "Free Meal",
          "10% Off",
          "Dessert",
          "20% Off",
          "Free Meal",
        ]}
        segColors={[
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ]}
        isOnlyOnce={false}
        className="mx-auto"
      />
    </section>
  );
};

export default WheelSection;
