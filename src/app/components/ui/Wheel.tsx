"use client";

import React, { useState, useRef } from "react";

const Wheel = ({ items = [], onSpinEnd }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const wheelRef = useRef(null);

  // Calculate the angle for each item
  const itemAngle = items.length > 0 ? 360 / items.length : 0;

  const spinWheel = () => {
    if (spinning || items.length === 0) return;

    setSpinning(true);
    setSelectedItem(null);

    // Random rotation (5-10 full rotations plus a random segment)
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 1800);
    setRotation(newRotation);

    // Calculate which item will be selected
    setTimeout(() => {
      const actualRotation = newRotation % 360;
      const invertedRotation = 360 - actualRotation; // Because we rotate clockwise
      const selectedIndex =
        Math.floor(invertedRotation / itemAngle) % items.length;
      setSelectedItem(items[selectedIndex]);
      if (onSpinEnd) onSpinEnd(items[selectedIndex]);
      setSpinning(false);
    }, 5000); // Match this with transition duration
  };

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Wheel */}
      <div
        ref={wheelRef}
        className={`w-full h-full rounded-full relative overflow-hidden shadow-lg transition-transform duration-[5000ms] ease-[cubic-bezier(0.17,0.67,0.12,0.99)] ${
          spinning ? "pointer-events-none" : ""
        }`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute w-1/2 h-1/2 origin-bottom-right"
            style={{
              transform: `rotate(${index * itemAngle}deg)`,
              backgroundColor: `${item.color}`,
            }}
          >
            <span
              className="absolute text-white font-bold text-sm whitespace-nowrap left-4 top-4"
              style={{ transform: `rotate(${itemAngle / 2}deg)` }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Center circle */}
      <div className="absolute top-1/2 left-1/2 w-16 h-16 -mt-8 -ml-8 bg-white rounded-full z-10 shadow-md"></div>

      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -ml-2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600 z-20"></div>

      {/* Spin button */}
      <button
        className={`mt-8 px-6 py-2 rounded-full font-bold text-white mx-auto block ${
          spinning || items.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } transition-colors`}
        onClick={spinWheel}
        disabled={spinning || items.length === 0}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>

      {/* Result display */}
      {selectedItem && (
        <div className="mt-4 text-center text-lg">
          Selected: <strong>{selectedItem}</strong>
        </div>
      )}
    </div>
  );
};

export default Wheel;
