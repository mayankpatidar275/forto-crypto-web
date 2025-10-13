"use client";
import { SignOutButton } from "@clerk/nextjs";
import React, { useState } from "react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SignOutButton redirectUrl="/">
      <button
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
        className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 relative min-w-[120px]"
      >
        <span
          className={`text-white text-sm transition-colors duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          Sign Out
        </span>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spinloader"></div>
          </div>
        )}
      </button>
    </SignOutButton>
  );
};

export default Logout;
