import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: #006400;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 1000;
  animation: popin 1s ease-out;

  @keyframes popin {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const WheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SpinButton = styled.button`
  padding: 1rem 2rem;
  background-color: #282c34;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #61dafb;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const colors = [
  "#CC4629",
  "#CC9A29",
  "#B2CC29",
  "#5ECC29",
  "#29CC46",
  "#29CC99",
  "#2985CC",
  "#293FCC",
  "#4629CC",
  "#9929CC",
  "#CC2981",
  "#CC2929",
  "#CC5929",
  "#CC9529",
  "#B2CC29",
  "#66CC29",
  "#29CC5F",
  "#29CC91",
  "#298ECC",
  "#4A29CC",
  "#8429CC",
  "#CC298F",
  "#CC294F",
];

interface SpinCardProps {
  items: string[];
  size?: number;
  spinDuration?: number;
  onSpinEnd?: (winner: string) => void;
  showConfetti?: boolean;
  buttonText?: string;
  className?: string;
}

export const SpinCard: React.FC<SpinCardProps> = ({
  items,
  size = 400,
  spinDuration = 6000,
  onSpinEnd,
  // showConfetti = true,
  buttonText = "Spin",
  className = "",
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const darkenColor = (color: string, amount: number): string => {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = size / 2;
    const sliceAngle = (2 * Math.PI) / items.length;

    // Clear and setup
    ctx.clearRect(0, 0, size, size);
    ctx.translate(radius, radius);
    ctx.rotate(-rotation * (Math.PI / 180));

    // Draw segments
    items.forEach((item, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      const color = darkenColor(colors[i % colors.length], 30);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw text
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.font = `bold ${Math.max(12, size / 25)}px Arial`;
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 3;
      ctx.fillText(item, radius * 0.5, 0);
      ctx.restore();
    });

    // Reset transformations
    ctx.rotate(rotation * (Math.PI / 180));
    ctx.translate(-radius, -radius);

    // Draw pointer
    ctx.save();
    ctx.translate(size, size / 2);
    ctx.beginPath();
    ctx.moveTo(-20, -10);
    ctx.lineTo(0, -10);
    ctx.lineTo(0, 10);
    ctx.lineTo(-20, 10);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  };

  const startSpin = () => {
    if (spinning || items.length === 0) return;
    setSpinning(true);
    setShowPopup(false);

    const numFullRotations = Math.random() * 5 + 5; // 5-10 rotations
    const totalRotation = numFullRotations * 360;
    const finalRotation = (rotation - totalRotation) % 360;

    const easing = (t: number) => 1 - Math.pow(1 - t, 3); // Ease-out cubic
    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / spinDuration, 1);
      const easeT = easing(t);
      const currentRotation = rotation - totalRotation * easeT;

      setRotation(currentRotation);

      if (elapsed < spinDuration) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        determineWinner(finalRotation);
      }
    };

    requestAnimationFrame(animate);
  };

  const determineWinner = (finalRotation: number) => {
    const sliceAngle = 360 / items.length;
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const winningIndex = Math.floor(normalizedRotation / sliceAngle);

    const winner = items[winningIndex];
    setWinner(winner);
    setShowPopup(true);
    onSpinEnd?.(winner);

    // if (showConfetti) {
    //   confetti({
    //     particleCount: 100,
    //     spread: 70,
    //     origin: { y: 0.6 },
    //   });
    // }
  };

  useEffect(() => {
    drawWheel();
  }, [items, rotation, size]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <WheelContainer className={className}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />
      <SpinButton onClick={startSpin} disabled={spinning || items.length === 0}>
        {buttonText}
      </SpinButton>
      {showPopup && winner && (
        <Popup>
          <h2>Congratulations!</h2>
          <h3>{winner}</h3>
        </Popup>
      )}
    </WheelContainer>
  );
};
