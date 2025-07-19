"use client";

import React, { useState, useRef } from "react";

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

    const spinDuration = 4000 + Math.random() * 4000;
    const rotations = 5 + Math.random() * 45;
    const degrees = rotations * 360;

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      const actualDegrees = degrees % 360;
      const segmentAngle = 360 / segments.length;
      const winningSegmentIndex = Math.floor(
        ((360 - actualDegrees + segmentAngle / 2) % 360) / segmentAngle
      );
      setWinner(segments[winningSegmentIndex].text);
    }, spinDuration);
  };

  const resetWheel = () => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
    setWinner(null);
  };

  // Rounded segments with perfect center meeting
  const renderSegments = () => {
    const segmentAngle = 360 / segments.length;
    const radius = 50; // Percentage-based radius
    const rounding = 5; // Adjust this for more/less rounding

    return segments.map((segment, index) => {
      const startAngle = ((index * segmentAngle - 90) * Math.PI) / 180;
      const endAngle = (((index + 1) * segmentAngle - 90) * Math.PI) / 180;

      // Calculate main points
      const x1 = 50 + radius * Math.cos(startAngle);
      const y1 = 50 + radius * Math.sin(startAngle);
      const x2 = 50 + radius * Math.cos(endAngle);
      const y2 = 50 + radius * Math.sin(endAngle);

      // Calculate control points for rounded edges
      const controlAngle1 = startAngle + (Math.PI / segments.length) * 0.3;
      const controlAngle2 = endAngle - (Math.PI / segments.length) * 0.3;

      const cx1 = 50 + (radius - rounding) * Math.cos(controlAngle1);
      const cy1 = 50 + (radius - rounding) * Math.sin(controlAngle1);
      const cx2 = 50 + (radius - rounding) * Math.cos(controlAngle2);
      const cy2 = 50 + (radius - rounding) * Math.sin(controlAngle2);

      return (
        <div
          key={index}
          className="wheel-segment absolute w-full h-full"
          style={{
            clipPath: `path('M 50 50 L ${x1} ${y1} Q ${cx1} ${cy1}, ${
              (x1 + x2) / 2
            } ${(y1 + y2) / 2} Q ${cx2} ${cy2}, ${x2} ${y2} Z')`,
            backgroundColor: segment.color,
          }}
        >
          <div
            className="segment-text absolute"
            style={{
              left: "70%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${segmentAngle / 2}deg)`,
              transformOrigin: "left center",
              width: "40%",
              fontSize: "clamp(12px, 3vw, 18px)",
              fontWeight: "bold",
              color: "white",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {segment.text}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-6xl relative flex flex-col justify-center items-center rounded-2xl overflow-hidden bg-white min-w-[250px]">
      <div className="h-18 w-full p-3 border-link flex justify-center flex-col items-center">
        {winner ? (
          <div className="text-background font-bold text-xl">
            Congratulations!!
          </div>
        ) : (
          <>
            <div className="text-background font-bold text-xl">
              Spin & Win Big!
            </div>
            <div className="text-xs text-gray-400">
              Chance to Win the FORTO everyday
            </div>
          </>
        )}
      </div>

      {!winner && <hr className="bg-gray-300 h-0.5 w-full" />}

      <div
        className="relative"
        style={{
          width: "clamp(250px, 80vw, 500px)",
          height: "clamp(250px, 80vw, 500px)",
        }}
      >
        {winner ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">You Won!</h2>
            <p className="text-xl font-semibold text-brand-br1">{winner}</p>
            <button
              onClick={resetWheel}
              className="mt-6 btn-primary shadow-lg transition-all bg-brand-br1 hover:bg-brand-br2"
            >
              SPIN AGAIN
            </button>
          </div>
        ) : (
          <div className="wheel-container relative h-full w-full p-4">
            <div
              ref={wheelRef}
              className="wheel w-full h-full rounded-full relative overflow-hidden shadow-xl"
              style={{
                transition: "transform 0s",
                border: "12px solid #38261d",
                boxShadow: "inset 0 0 0 8px #333, inset 0 0 0 16px #ff793f",
              }}
            >
              {renderSegments()}
            </div>

            {/* Wheel pointer */}
            <div
              className="wheel-pointer absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                width: "0",
                height: "0",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderTop: "32px solid #333",
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
              }}
            ></div>
          </div>
        )}
      </div>

      {!winner && (
        <div className="h-20 flex justify-center items-center pb-4">
          <button
            onClick={spinWheel}
            disabled={spinning}
            className={`btn-primary shadow-lg transition-all ${
              spinning ? "bg-gray-400" : "bg-brand-br1 hover:bg-brand-br2"
            }`}
          >
            {spinning ? "SPINNING..." : "SPIN"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SpinTheWheelCard;
