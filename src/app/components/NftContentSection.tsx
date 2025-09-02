import { useAppContext } from "@/custom-hooks/useAppContext";
import React, { useState } from "react";
import BuyNowBtn from "./ui/BuyNowBtn";
import AddToCartBtn from "./ui/AddToCartBtn";

const NftContentSection = () => {
  const { state } = useAppContext();
  const [ticketCount, setTicketCount] = useState("1");

  // Number of FORTO tokens required per ticket
  const FORTO_PER_TICKET = 100;

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      // allow only numeric input
      setTicketCount(val);
    }
  };
  function getCurrentMonth(): string {
    const date = new Date();
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  }
  const totalCost = ticketCount
    ? parseInt(ticketCount || "1", 10) * FORTO_PER_TICKET
    : 0;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h2 className="text-3xl font-bold font-josef tracking-tight">
        {state.selectedNft?.title}
        <span className="text-brand-br1">
          {" " + state.selectedNft?.price} FORTO
        </span>
      </h2>
      <p className="text-link text-sm leading-relaxed">
        Every ticket you buy enters you into a decade-long sweepstakes. Stay
        patient, win big.
      </p>

      <div className="text-brand-br1 font-semibold text-sm">
        <span className="text-white">Current Draw:</span> {getCurrentMonth()}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Number of Tickets</label>
        <input
          type="text"
          value={ticketCount}
          onChange={handleTicketChange}
          inputMode="numeric"
          pattern="[0-9]*"
          onBlur={() => {
            if (ticketCount == "" || !(Number(ticketCount) > 0))
              setTicketCount("1");
          }}
          min={1}
          className="bg-background text-white border border-border px-3 py-2 rounded-md w-full"
        />
      </div>

      <div className="text-lg font-semibold text-brand-br1">
        <span className="text-white">Total Cost:</span> {totalCost} FORTO
      </div>

      <div className="flex justify-between">
        {state && state.selectedNft?.imageUrl && (
          <BuyNowBtn
            buyItems={{
              nftId: state.selectedNft.id,
              quantity: Number(ticketCount),
            }}
          />
        )}

        <AddToCartBtn ticketCount={ticketCount} />
      </div>
    </div>
  );
};

export default NftContentSection;
