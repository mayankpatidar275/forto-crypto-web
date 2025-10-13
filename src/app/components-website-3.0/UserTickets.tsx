"use client";

import { useUserTickets } from "@/custom-hooks/queries";
import { EmptyState } from "./ui/EmptyState";
import { ErrorState } from "./ui/ErrorState";
import Loader from "./ui/Loader";
import UserTicketCard from "./ui/UserTicketCard";

interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  drawId?: string;
  shortCode: string;
  blockchainHash: string;
  metadata: {
    email: string;
    phone: string;
    gender: string;
    lastName: string;
    firstName: string;
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
      id: string;
      eventId: string;
      brandId: string;
      brand: {
        id: string;
        name: string;
        description: string | null;
        website: string | null;
      };
    }>;
    categories: Array<unknown>;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
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

interface TicketsResponse {
  success: boolean;
  data: {
    count: number;
    tickets: Ticket[];
  };
}

const UserTickets = () => {
  const { data: ticketsData, isLoading, error } = useUserTickets();

  if (isLoading) {
    return (
      <div className="my-20">
        <Loader className="mx-auto my-auto flex justify-center" />
      </div>
    );
  }

  if (error || !ticketsData?.success) {
    return (
      <ErrorState message="Failed to load your tickets. Please try again later." />
    );
  }

  const ticketsResponse = ticketsData as TicketsResponse;
  const tickets = ticketsResponse.data.tickets;

  return (
    <div className="bg-background-b3 shadow-md rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">My Tickets</h3>
        <span className="text-sm text-link bg-background px-3 py-1 rounded-full">
          {tickets.length} {tickets.length === 1 ? "Ticket" : "Tickets"}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {tickets.length === 0 ? (
          <EmptyState message="No tickets found. Participate in events to get tickets!" />
        ) : (
          tickets.map((ticket: Ticket) => (
            <UserTicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserTickets;
