"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Logout = () => {
  return (
    <SignOutButton>
      <div className="flex justify-center items-center">
        <Link
          href={"/"}
          className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
        >
          <button className="text-white text-sm transition-colors duration-300 cursor-pointer">
            Sign Out
          </button>
        </Link>
      </div>
    </SignOutButton>
  );
};

export default Logout;
