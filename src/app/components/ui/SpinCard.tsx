"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

// type Segment = {
//   text: string;
//   color: string;
// };

interface SpinCardProps {
  segments: string[];
  segColors: string[];
  winningSegment?: string;
  onFinished?: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  fontSize?: string;
  outlineWidth?: number;
  className?: string;
}

const SpinCard: React.FC<SpinCardProps> = ({
  segments,
  segColors,
  // winningSegment,
  onFinished,
  primaryColor = "bg-gray-900",
  contrastColor = "text-white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = 300,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = "font-sans",
  fontSize = "text-base",
  outlineWidth = 10,
  className = "",
}) => {
  // Refs for stable IDs and canvas context
  const wheelId = useRef(`wheel-${Math.random().toString(36).substring(2, 9)}`);
  const canvasId = useRef(
    `canvas-${Math.random().toString(36).substring(2, 9)}`
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);

  // State management
  const [isClient, setIsClient] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState("");

  // Animation variables
  const timerHandleRef = useRef(0);
  const angleCurrentRef = useRef(0);
  const angleDeltaRef = useRef(0);
  const maxSpeedRef = useRef(Math.PI / segments.length);
  const framesRef = useRef(0);
  const spinStartRef = useRef(0);
  const currentSegmentRef = useRef("");

  // Constants
  const dimension = (size + 20) * 2;
  const centerX = size + 20;
  const centerY = size + 20;
  const timerDelay = segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;

  // Calculate current segment based on angle
  const getCurrentSegment = useCallback(
    (angle: number) => {
      const segmentAngle = (2 * Math.PI) / segments.length;
      // Normalize angle to [0, 2π]
      const normalizedAngle =
        ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // Calculate which segment we're in (rotated by π/2 to align with needle)
      const index =
        Math.floor((normalizedAngle + Math.PI / 2) / segmentAngle) %
        segments.length;
      // Reverse the index since we're rotating clockwise
      return segments[segments.length - 1 - index];
    },
    [segments]
  );

  // Initialize component
  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerHandleRef.current) {
        clearInterval(timerHandleRef.current);
      }
    };
  }, []);

  // Initialize canvas when client is ready
  useEffect(() => {
    if (!isClient) return;

    const canvas = document.getElementById(
      canvasId.current
    ) as HTMLCanvasElement;
    if (!canvas) return;

    canvasRef.current = canvas;
    canvasContextRef.current = canvas.getContext("2d");
    canvas.addEventListener("click", handleSpin, false);

    drawWheel();
    drawNeedle();

    return () => {
      canvas.removeEventListener("click", handleSpin, false);
    };
  }, [isClient]);

  // Draw a single segment
  const drawSegment = useCallback(
    (key: number, lastAngle: number, angle: number) => {
      if (!canvasContextRef.current) return;

      const ctx = canvasContextRef.current;
      const value = segments[key];
      ctx.save();

      // Draw segment path
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();

      // Fill segment
      ctx.fillStyle = segColors[key % segColors.length];
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = contrastColor.includes("text-")
        ? getComputedStyle(document.documentElement).getPropertyValue(
            `--${contrastColor.split("-")[1]}`
          ) || "#ffffff"
        : contrastColor;
      ctx.font = `bold ${fontSize.replace("text-", "")} ${fontFamily}`;
      ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
      ctx.restore();
    },
    [segments, segColors, size, contrastColor, fontSize, fontFamily]
  );

  // Draw the entire wheel
  const drawWheel = useCallback(() => {
    if (!canvasContextRef.current) return;

    const ctx = canvasContextRef.current;
    let lastAngle = angleCurrentRef.current;
    const PI2 = Math.PI * 2;

    // Clear canvas
    ctx.clearRect(0, 0, dimension, dimension);

    // Draw segments
    for (let i = 1; i <= segments.length; i++) {
      const angle = PI2 * (i / segments.length) + angleCurrentRef.current;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor.includes("bg-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${primaryColor.split("-")[1]}`
        ) || "#000000"
      : primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = outlineWidth;
    ctx.strokeStyle = primaryColor.includes("bg-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${primaryColor.split("-")[1]}`
        ) || "#000000"
      : primaryColor;
    ctx.stroke();
  }, [
    dimension,
    centerX,
    centerY,
    primaryColor,
    contrastColor,
    fontFamily,
    buttonText,
    size,
    outlineWidth,
    segments.length,
    drawSegment,
  ]);

  // Draw the needle indicator
  const drawNeedle = useCallback(() => {
    if (!canvasContextRef.current) return;

    const ctx = canvasContextRef.current;

    // Draw needle triangle
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.fillStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();

    // Update current segment
    const newSegment = getCurrentSegment(angleCurrentRef.current);
    currentSegmentRef.current = newSegment;

    // Draw current segment text if spinning
    if (isSpinning) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = primaryColor.includes("bg-")
        ? getComputedStyle(document.documentElement).getPropertyValue(
            `--${primaryColor.split("-")[1]}`
          ) || "#000000"
        : primaryColor;
      ctx.font = "bold 1.5em " + fontFamily;
      ctx.fillText(newSegment, centerX + 10, centerY + size + 50);
    }
  }, [
    getCurrentSegment,
    size,
    isSpinning,
    primaryColor,
    contrastColor,
    fontFamily,
  ]);

  // Handle the spin animation
  const onTimerTick = useCallback(() => {
    if (!canvasContextRef.current) return;

    framesRef.current++;
    drawWheel();
    drawNeedle();

    const duration = new Date().getTime() - spinStartRef.current;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      // Acceleration phase
      progress = duration / upTime;
      angleDeltaRef.current =
        maxSpeedRef.current * Math.sin((progress * Math.PI) / 2);
    } else {
      // Deceleration phase
      progress = duration / downTime;
      angleDeltaRef.current =
        maxSpeedRef.current * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      if (progress >= 1) finished = true;
    }

    angleCurrentRef.current += angleDeltaRef.current;
    while (angleCurrentRef.current >= Math.PI * 2)
      angleCurrentRef.current -= Math.PI * 2;

    if (finished) {
      const finalSegment = getCurrentSegment(angleCurrentRef.current);
      setIsFinished(true);
      setIsSpinning(false);
      setWinner(finalSegment);
      if (onFinished) onFinished(finalSegment);
      clearInterval(timerHandleRef.current);
      timerHandleRef.current = 0;
      angleDeltaRef.current = 0;
    }
  }, [drawNeedle, drawWheel, onFinished, getCurrentSegment]);

  // Start the spin
  const handleSpin = useCallback(() => {
    if ((isFinished && isOnlyOnce) || isSpinning) return;

    setIsSpinning(true);
    setIsFinished(false);
    setWinner("");

    if (timerHandleRef.current === 0) {
      spinStartRef.current = new Date().getTime();
      maxSpeedRef.current = Math.PI / segments.length;
      framesRef.current = 0;
      timerHandleRef.current = window.setInterval(onTimerTick, timerDelay);
    }
  }, [isFinished, isOnlyOnce, isSpinning, onTimerTick, segments.length]);

  // Reset the wheel
  const handleReset = useCallback(() => {
    setIsFinished(false);
    setIsSpinning(false);
    setWinner("");
    angleCurrentRef.current = 0;
    angleDeltaRef.current = 0;
    drawWheel();
    drawNeedle();
  }, [drawNeedle, drawWheel]);

  // Loading state for SSR
  if (!isClient) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg ${className}`}
      >
        <div className="relative">
          <div
            className="rounded-full bg-gray-200 animate-pulse"
            style={{ width: dimension, height: dimension }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg ${className}`}
    >
      <div id={wheelId.current} className="relative">
        <canvas
          id={canvasId.current}
          ref={canvasRef}
          width={dimension}
          height={dimension}
          className={`transition-opacity ${
            isFinished && isOnlyOnce ? "opacity-80" : "opacity-100"
          } cursor-pointer hover:shadow-xl rounded-full`}
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
        {isFinished && isOnlyOnce && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 text-white p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {winner && (
        <div className="mt-6 p-4 bg-blue-100 rounded-lg text-center animate-bounce">
          <p className="text-lg font-semibold text-blue-800">
            You won: {winner}!
          </p>
        </div>
      )}

      {/* <div className="flex gap-4 mt-6">
        {!isFinished && (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`px-6 py-3 ${primaryColor} ${contrastColor} rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSpinning ? "Spinning..." : buttonText}
          </button>
        )}

        {!isOnlyOnce && isFinished && (
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Spin Again
          </button>
        )}
      </div> */}
    </div>
  );
};

export default SpinCard;
