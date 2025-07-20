"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface SpinCardProps {
  title?: string;
  subtitle?: string;
  segments: string[];
  segColors: string[];
  winningSegment?: string;
  onFinished?: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  className?: string;
}

const SpinCard: React.FC<SpinCardProps> = ({
  title = "Spin to Win",
  subtitle = "Try your luck to win exciting prizes",
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = "bg-indigo-600",
  contrastColor = "text-white",
  buttonText = "SPIN",
  isOnlyOnce = false,
  className = "",
}) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [isClient, setIsClient] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState("");
  const [wheelSize, setWheelSize] = useState(200);
  const [showCelebration, setShowCelebration] = useState(false);

  // Animation refs
  const timerHandleRef = useRef(0);
  const angleCurrentRef = useRef(0);
  const angleDeltaRef = useRef(0);
  const maxSpeedRef = useRef(Math.PI / segments.length);
  const framesRef = useRef(0);
  const spinStartRef = useRef(0);
  const currentSegmentRef = useRef("");

  // Calculate dimensions
  const dimension = wheelSize * 2;
  const center = wheelSize;
  const timerDelay = segments.length;
  const upTime = segments.length * 100;
  const downTime = segments.length * 800;

  // Calculate current segment
  const getCurrentSegment = useCallback(
    (angle: number) => {
      const segmentAngle = (2 * Math.PI) / segments.length;
      const normalizedAngle =
        ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const index =
        Math.floor((normalizedAngle + Math.PI / 2) / segmentAngle) %
        segments.length;
      return segments[segments.length - 1 - index];
    },
    [segments]
  );

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const newSize = Math.min(
        280, // max size
        Math.max(200, containerWidth * 0.8) // responsive but not too small
      );
      setWheelSize(newSize);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Initialize
  useEffect(() => {
    setIsClient(true);
    return () => {
      if (timerHandleRef.current) clearInterval(timerHandleRef.current);
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    canvasContextRef.current = canvasRef.current.getContext("2d");
    drawWheel();
    drawNeedle();
  }, [isClient, wheelSize]);

  // Draw wheel segments
  const drawWheel = useCallback(() => {
    if (!canvasContextRef.current) return;

    const ctx = canvasContextRef.current;
    ctx.clearRect(0, 0, dimension, dimension);

    let lastAngle = angleCurrentRef.current;
    for (let i = 1; i <= segments.length; i++) {
      const angle =
        2 * Math.PI * (i / segments.length) + angleCurrentRef.current;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, wheelSize, lastAngle, angle, false);
      ctx.lineTo(center, center);
      ctx.fillStyle = segColors[i % segColors.length];
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = contrastColor.includes("text-")
        ? getComputedStyle(document.documentElement).getPropertyValue(
            `--${contrastColor.split("-")[1]}`
          ) || "#ffffff"
        : contrastColor;
      ctx.font = `bold ${Math.max(10, wheelSize / 15)}px sans-serif`;
      ctx.fillText(segments[i - 1].substring(0, 12), wheelSize / 2 + 5, 0);
      ctx.restore();

      lastAngle = angle;
    }

    // Draw center button
    ctx.beginPath();
    ctx.arc(center, center, wheelSize / 4, 0, 2 * Math.PI);
    ctx.fillStyle = primaryColor.includes("bg-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${primaryColor.split("-")[1]}`
        ) || "#000000"
      : primaryColor;
    ctx.fill();
    ctx.strokeStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center text
    ctx.fillStyle = contrastColor.includes("text-")
      ? getComputedStyle(document.documentElement).getPropertyValue(
          `--${contrastColor.split("-")[1]}`
        ) || "#ffffff"
      : contrastColor;
    ctx.font = `bold ${wheelSize / 10}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, center, center + 3);

    // Update current segment
    currentSegmentRef.current = getCurrentSegment(angleCurrentRef.current);
  }, [
    segments,
    segColors,
    wheelSize,
    buttonText,
    primaryColor,
    contrastColor,
    getCurrentSegment,
  ]);

  // Draw needle
  const drawNeedle = useCallback(() => {
    if (!canvasContextRef.current || showCelebration) return;

    const ctx = canvasContextRef.current;
    ctx.fillStyle = "#e53e3e";
    ctx.beginPath();
    ctx.moveTo(center + 10, 10);
    ctx.lineTo(center - 10, 10);
    ctx.lineTo(center, 0);
    ctx.closePath();
    ctx.fill();
  }, [wheelSize, showCelebration]);

  // Animation tick - Fixed to match original library logic
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
      if (winningSegment) {
        if (
          currentSegmentRef.current === winningSegment &&
          framesRef.current > segments.length
        ) {
          progress = duration / upTime;
          angleDeltaRef.current =
            maxSpeedRef.current *
            Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDeltaRef.current =
            maxSpeedRef.current *
            Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDeltaRef.current =
          maxSpeedRef.current *
          Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrentRef.current += angleDeltaRef.current;
    while (angleCurrentRef.current >= Math.PI * 2)
      angleCurrentRef.current -= Math.PI * 2;

    if (finished) {
      const finalSegment = currentSegmentRef.current;
      setIsFinished(true);
      setIsSpinning(false);
      setWinner(finalSegment);
      setShowCelebration(true);
      if (onFinished) onFinished(finalSegment);
      clearInterval(timerHandleRef.current);
      timerHandleRef.current = 0;
      angleDeltaRef.current = 0;
    }
  }, [drawWheel, drawNeedle, winningSegment, segments.length, onFinished]);

  // Handle spin
  const handleSpin = useCallback(() => {
    if ((isFinished && isOnlyOnce) || isSpinning) return;

    setShowCelebration(false);
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

  // Reset wheel
  const handleReset = useCallback(() => {
    setIsFinished(false);
    setIsSpinning(false);
    setWinner("");
    setShowCelebration(false);
    angleCurrentRef.current = 0;
    angleDeltaRef.current = 0;
    drawWheel();
    drawNeedle();
  }, [drawWheel, drawNeedle]);

  // Loading state
  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className={`max-w-md w-full p-6 bg-white rounded-xl shadow-md ${className}`}
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="relative aspect-square w-full">
          <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`max-w-md w-full p-6 bg-white rounded-xl shadow-md ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* Wheel Container - Fixed Aspect Ratio */}
      <div className="relative aspect-square w-full">
        {/* Wheel Canvas */}
        <canvas
          ref={canvasRef}
          width={dimension}
          height={dimension}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            isFinished && isOnlyOnce ? "opacity-80" : "opacity-100"
          }`}
          onClick={handleSpin}
        />

        {/* Needle pointer - Hidden during celebration */}
        {!showCelebration && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-500" />
          </div>
        )}

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full animate-fade-in">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
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
              <h4 className="text-white font-bold text-lg mb-1">
                Congratulations!
              </h4>
              <p className="text-white font-medium mb-3">
                You won: <span className="font-bold">{winner}</span>
              </p>
              {!isOnlyOnce && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  Spin Again
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Spin status (for screen readers) */}
      <div aria-live="polite" className="sr-only">
        {isSpinning
          ? "Spinning..."
          : isFinished
          ? `You won: ${winner}`
          : "Ready to spin"}
      </div>
    </div>
  );
};

export default SpinCard;
