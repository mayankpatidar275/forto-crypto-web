"use client";

import React from "react";
import ProfileSection from "../components-website-3.0/ProfileSection";
import Logout from "../components-website-3.0/ui/Logout";
import UserTickets from "../components-website-3.0/UserTickets";
import { useUser } from "@clerk/nextjs";
import Loader from "../components-website-3.0/ui/Loader";

const MyProfilePage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 mt-40 h-[60vh]">
        <Loader className="mx-auto my-auto flex justify-center" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 mt-20">Please login!</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 mt-20">
      {/* Header with SpinButton aligned to the right */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {/* <SpinButton /> */}
      </div>

      <ProfileSection />
      <UserTickets />
      <div className="flex justify-center">
        <Logout />
      </div>
    </div>
  );
};

export default MyProfilePage;
