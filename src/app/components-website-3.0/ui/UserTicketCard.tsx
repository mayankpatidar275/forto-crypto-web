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
  const eventEndDate = new Date(ticket.event.endDate);
  const drawEndDate = ticket.draw?.endDate
    ? new Date(ticket.draw.endDate)
    : null;

  // Countdown timer effect
  useEffect(() => {
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
  }, [eventEndDate, drawEndDate]);

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
      <div className="flex justify-between items-start mb-4">
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
          <div className="flex gap-4 text-center">
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

      {/* Toggle Details Button */}
      {/* <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-2 text-center text-sm text-link hover:text-white transition-colors border border-gray-700 rounded-lg mb-4"
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button> */}

      {/* Expandable Details */}
      {/* {showDetails && (
        <div className="space-y-4 p-4 bg-background-b3 rounded-lg"> */}
      {/* Personal Information */}
      {/* <div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-link">Name:</span>
                <p className="text-white">
                  {ticket.metadata.firstName} {ticket.metadata.lastName}
                </p>
              </div>
              <div>
                <span className="text-link">Email:</span>
                <p className="text-white">{ticket.metadata.email}</p>
              </div>
              <div>
                <span className="text-link">Phone:</span>
                <p className="text-white">{ticket.metadata.phone}</p>
              </div>
              <div>
                <span className="text-link">Gender:</span>
                <p className="text-white capitalize">
                  {ticket.metadata.gender}
                </p>
              </div>
            </div>
          </div> */}

      {/* Event Information */}
      {/* <div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Event Information
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-link">Event Period:</span>
                <p className="text-white">
                  {formatDate(ticket.event.startDate)} -{" "}
                  {formatDate(ticket.event.endDate)}
                </p>
              </div>
              <div>
                <span className="text-link">Status:</span>
                <p className="text-white capitalize">
                  {ticket.event.status.toLowerCase()}
                </p>
              </div>
              {ticket.metadata.shoppingWebsite && (
                <div className="col-span-2">
                  <span className="text-link">Preferred Store:</span>
                  <p className="text-white capitalize">
                    {ticket.metadata.shoppingWebsite}
                  </p>
                </div>
              )}
            </div>
          </div> */}

      {/* Draw Information (if available) */}
      {/* {ticket.draw && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Draw Information
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-link">Round:</span>
                  <p className="text-white">#{ticket.draw.roundNumber}</p>
                </div>
                <div>
                  <span className="text-link">Coins Allocated:</span>
                  <p className="text-white">{ticket.draw.coinsAllocated}</p>
                </div>
              </div>
            </div>
          )} */}

      {/* Winner Information (if available) */}
      {/* {ticket.winner && (
            <div className="p-3 bg-green-900/20 border border-green-500 rounded-lg">
              <h4 className="text-sm font-semibold text-green-400 mb-2">
                🎉 Congratulations! You Won!
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-green-300">Tier:</span>
                  <p className="text-white capitalize">
                    {ticket.winner.tier.toLowerCase()}
                  </p>
                </div>
                <div>
                  <span className="text-green-300">Won On:</span>
                  <p className="text-white">
                    {formatDate(ticket.winner.decidedAt)}
                  </p>
                </div>
                <div>
                  <span className="text-green-300">Reward Status:</span>
                  <p className="text-white">
                    {ticket.winner.rewardSent ? "Sent" : "Processing"}
                  </p>
                </div>
              </div>
            </div>
          )} */}
      {/* </div>
      )} */}
    </div>
  );
};

export default UserTicketCard;
