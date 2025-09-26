import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Animations
const popin = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const Card = styled.div`
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Title = styled.h2`
  color: #ffffff;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  margin: 0.5rem 0 0;
  font-size: 1rem;
`;

const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1/1;
  margin: 1.5rem 0;
`;

const WheelCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid #f1c40f;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
`;

const CenterButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    border: 2px dashed white;
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const Pointer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 25px solid #e74c3c;
  z-index: 5;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: #27ae60;
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;
  animation: ${popin} 0.5s ease-out;
  border: 4px solid #2ecc71;
  max-width: 90%;

  h2 {
    margin: 0;
    font-size: 2rem;
    color: #27ae60;
  }

  h3 {
    margin: 1rem 0 0;
    font-size: 1.5rem;
    color: #2c3e50;
    font-weight: 700;
  }

  &::before {
    content: "🎉";
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    animation: ${float} 2s ease-in-out infinite;
  }
`;

const colors = [
  // "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f1c40f",
  "#9b59b6",
  "#1abc9c",
  "#d35400",
  "#34495e",
  "#e67e22",
  "#16a085",
  "#c0392b",
  "#2980b9",
  "#27ae60",
  "#f39c12",
  "#8e44ad",
];

interface SpinCardProps {
  items: string[];
  title?: string;
  subtitle?: string;
  size?: number;
  spinDuration?: number;
  onSpinEnd?: (winner: string) => void;
  buttonText?: string;
  className?: string;
}

export const SpinCard: React.FC<SpinCardProps> = ({
  items,
  title = "Spin to Win!",
  subtitle = "Try your luck and see what you get",
  size = 400,
  spinDuration = 6000,
  onSpinEnd,
  // buttonText = "SPIN",
  className = "",
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const darkenColor = (color: string, amount: number): string => {
  //   let r = parseInt(color.slice(1, 3), 16);
  //   let g = parseInt(color.slice(3, 5), 16);
  //   let b = parseInt(color.slice(5, 7), 16);

  //   r = Math.max(0, r - amount);
  //   g = Math.max(0, g - amount);
  //   b = Math.max(0, b - amount);

  //   return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  // };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on container size
    const containerSize = Math.min(
      canvas.parentElement?.clientWidth || size,
      size
    );
    canvas.width = containerSize;
    canvas.height = containerSize;

    const radius = containerSize / 2;
    const sliceAngle = (2 * Math.PI) / items.length;

    // Clear and setup
    ctx.clearRect(0, 0, containerSize, containerSize);
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

      const color = colors[i % colors.length];
      ctx.fillStyle = color;
      ctx.fill();

      // Add border between segments
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.font = `bold ${Math.max(14, containerSize / 20)}px Arial`;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.shadowBlur = 2;

      // Adjust text position based on segment size
      const textRadius = radius * 0.6;
      ctx.fillText(item, textRadius, 0);
      ctx.restore();
    });

    // Reset transformations
    ctx.rotate(rotation * (Math.PI / 180));
    ctx.translate(-radius, -radius);
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
  };

  useEffect(() => {
    drawWheel();
  }, [items, rotation, size]);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      drawWheel();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <Card className={className}>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>

      <WheelContainer>
        <Pointer />
        <WheelCanvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
        />
        <CenterButton
          onClick={startSpin}
          disabled={spinning || items.length === 0}
        >
          Spin
          {/* {buttonText} */}
        </CenterButton>
      </WheelContainer>

      {showPopup && winner && (
        <Popup>
          <h2>Congratulations!</h2>
          <h3>You won: {winner}</h3>
        </Popup>
      )}
    </Card>
  );
};
