"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Ticket {
  id: string;
  shortCode: string;
  blockchainHash: string;
  metadata: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    purchasedBefore: boolean;
    shoppingWebsite: string;
  };
  createdAt: string;
  event: {
    id: string;
    name: string;
    description: string | null;
    startDate: string;
    endDate: string;
    status: string;
    brands: Array<{
      brand: {
        id: string;
        name: string;
        description: string | null;
        website: string | null;
      };
    }>;
  };
  draw?: {
    id: string;
    roundNumber: number;
    coinsAllocated: number;
    startDate: string | null;
    endDate: string | null;
  };
  winner?: {
    id: string;
    tier: string;
    decidedAt: string;
    rewardSent: boolean;
    notes: string | null;
    draw: {
      id: string;
      roundNumber: number;
    };
  };
}

interface UserTicketCardProps {
  ticket: Ticket;
}

const UserTicketCard: React.FC<UserTicketCardProps> = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  // const [showDetails, setShowDetails] = useState(false);

  const primaryBrand = ticket.event.brands[0]?.brand;

  // Countdown timer effect
  useEffect(() => {
    const eventEndDate = new Date(ticket.event.endDate);
    const drawEndDate = ticket.draw?.endDate
      ? new Date(ticket.draw.endDate)
      : null;
    const targetDate = drawEndDate || eventEndDate;

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket.event.endDate, ticket.draw?.endDate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = () => {
    if (ticket.winner) {
      return (
        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
          🏆 Winner - {ticket.winner.tier}
        </span>
      );
    }

    if (timeLeft === null) {
      return (
        <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
          Ended
        </span>
      );
    }

    return (
      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
        Active
      </span>
    );
  };

  const getImageUrl = () => {
    // In a real app, you might have brand logos, event images, or draw images
    // For now, using a placeholder with brand initials
    return `https://ui-avatars.com/api/?name=${
      primaryBrand?.name || ticket.event.name
    }&background=random&size=64`;
  };

  return (
    <div className=" rounded-xl p-6 bg-background hover:bg-background-b2 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 flex-col gap-2 sm:flex-row">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 overflow-hidden rounded-lg shrink-0">
            <Image
              src={getImageUrl()}
              alt={primaryBrand?.name || ticket.event.name}
              className="object-cover"
              layout="fill"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {ticket.event.name}
            </h3>
            <p className="text-sm text-link">
              {primaryBrand?.name || "Event"} • Ticket #{ticket.shortCode}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge()}
              {ticket.draw && (
                <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                  Round {ticket.draw.roundNumber}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-link">
            Participated on {formatDate(ticket.createdAt)}
          </p>
          {/* {ticket.blockchainHash && (
            <p className="text-xs text-gray-400 mt-1">
              Hash: {ticket.blockchainHash.slice(0, 8)}...
            </p>
          )} */}
        </div>
      </div>

      {/* Countdown Timer */}
      {timeLeft && (
        <div className="mb-4 p-3 bg-background-b3 rounded-lg">
          <p className="text-sm text-link mb-2">
            {ticket.draw ? "Draw ends in:" : "Event ends in:"}
          </p>
          <div className="flex gap-4 text-center scale-40 sm:scale-100">
            <div>
              <div className="text-xl font-bold text-white">
                {timeLeft.days}
              </div>
              <div className="text-xs text-link">Days</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {timeLeft.hours}
              </div>
              <div className="text-xs text-link">Hours</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {timeLeft.minutes}
              </div>
              <div className="text-xs text-link">Minutes</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">
                {timeLeft.seconds}
              </div>
              <div className="text-xs text-link">Seconds</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTicketCard;
