"use client";

import React from "react";
import Label2 from "./ui/Label2";

const GetYourTicketBtn = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div onClick={() => scrollToSection("get-now")} className="mt-8">
      <Label2 text="Get Your Ticket" />
    </div>
  );
};

export default GetYourTicketBtn;
