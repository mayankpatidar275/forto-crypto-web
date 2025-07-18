"use client";

import React, { useState, useRef } from "react";
import Loader from "./Loader";

const SpinTheWheelCard = () => {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Wheel segments with colors and prizes
  const segments = [
    { text: "10% OFF", color: "#EE4040" },
    { text: "FREE MINT", color: "#F0CF50" },
    { text: "25% OFF", color: "#815CD1" },
    { text: "TRY AGAIN", color: "#3DA5E0" },
    { text: "5% OFF", color: "#34A24F" },
  ];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setWinner(null);

    // Random spin duration (4-8 seconds)
    const spinDuration = 4000 + Math.random() * 4000;
    // Random rotation (5-50 full rotations)
    const rotations = 5 + Math.random() * 45;
    const degrees = rotations * 360;

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    // Determine winner after spin
    setTimeout(() => {
      setSpinning(false);

      // Calculate which segment is at the top (winner)
      const actualDegrees = degrees % 360;
      const segmentAngle = 360 / segments.length;
      const winningSegmentIndex = Math.floor(
        ((360 - actualDegrees) % 360) / segmentAngle
      );

      setWinner(segments[winningSegmentIndex].text);
    }, spinDuration);
  };

  // Generate wheel segments dynamically
  const renderSegments = () => {
    const segmentAngle = 360 / segments.length;
    return segments.map((segment, index) => (
      <div
        key={index}
        className="wheel-segment absolute w-full h-full"
        style={{
          transform: `rotate(${index * segmentAngle}deg)`,
          clipPath: `polygon(50% 50%, 50% 0%, ${
            50 + 50 * Math.tan((segmentAngle * Math.PI) / 360)
          }% 0%)`,
          backgroundColor: segment.color,
        }}
      >
        <div
          className="segment-text absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${segmentAngle / 2}deg)`,
            transformOrigin: "left center",
            textAlign: "center",
            width: "50%",
            fontSize: "clamp(12px, 2vw, 18px)",
            fontWeight: "bold",
            color: "white",
            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          }}
        >
          {segment.text}
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl flex flex-col justify-center items-center rounded-2xl overflow-hidden bg-white">
      <div className="relative w-full p-6 border-b-2 border-link">
        <div className="flex justify-center">
          <div className="text-background font-extrabold text-xl">
            {winner ? "Congratulations!" : "Spin & Win Big!"}
          </div>
        </div>
        <div className="absolute text-link top-0 right-0 m-6">X</div>
      </div>

      <div
        className="wheel-container relative mt-8 p-8"
        style={{
          width: "clamp(250px, 80vw, 500px)",
          height: "clamp(250px, 80vw, 500px)",
        }}
      >
        <div
          ref={wheelRef}
          className="wheel w-full h-full rounded-full relative overflow-hidden border-8 border-gray-800 shadow-xl"
          style={{ transition: "transform 0s" }}
        >
          {renderSegments()}
        </div>

        {/* Wheel pointer */}
        <div
          className="wheel-pointer absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            width: "0",
            height: "0",
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: "40px solid #333",
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
          }}
        ></div>
      </div>

      {spinning ? (
        <Loader className="mx-auto my-auto flex justify-center" />
      ) : (
        <button
          onClick={spinWheel}
          disabled={spinning}
          className={`btn-primary shadow-lg transition-all bg-brand-br1`}
        >
          SPIN
        </button>
      )}

      {winner && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center animate-bounce">
          <p className="font-bold text-xl">Congratulations!</p>
          <p>You won: {winner}</p>
        </div>
      )}
    </div>
  );
};

export default SpinTheWheelCard;
