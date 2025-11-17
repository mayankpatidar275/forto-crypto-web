/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const ProfileSection = () => {
  const { user, isLoaded } = useUser();

  // Function to extract initials from email or name
  const getInitials = (): string => {
    if (!user) return "GU";

    // Try to get initials from full name first
    if (user.fullName) {
      const names = user.fullName.split(" ");
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return names[0].substring(0, 2).toUpperCase();
    }

    // Fallback to email
    const email = user.primaryEmailAddress?.emailAddress;
    if (email) {
      const username = email.split("@")[0];
      if (username.includes(".")) {
        const parts = username.split(".");
        return parts.length >= 2
          ? (parts[0][0] + parts[1][0]).toUpperCase()
          : username.substring(0, 2).toUpperCase();
      }
      return username.substring(0, 2).toUpperCase();
    }

    return "GU";
  };

  // Function to generate a consistent color based on user id
  const getColorFromUserId = (): string => {
    const userId = user?.id;
    if (!userId) return "#3B82F6";

    const colors = [
      "#3B82F6",
      "#10B981",
      "#EF4444",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
      "#06B6D4",
      "#84CC16",
    ];

    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const avatarInitials = getInitials();
  const avatarBgColor = getColorFromUserId();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userName = user?.fullName || userEmail?.split("@")[0] || "User";

  return (
    <div className="flex gap-4 items-center bg-background-b3 rounded-xl shadow-sm p-6 w-full hover:shadow-md transition-all duration-300 mx-auto">
      <SignedOut>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 flex-shrink-0">
          <span className="text-white font-bold text-lg">GU</span>
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white">Guest User</p>
          <p className="text-sm text-link opacity-90">Please sign in</p>
        </div>
      </SignedOut>

      <SignedIn>
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg flex-shrink-0"
          style={{ backgroundColor: avatarBgColor }}
        >
          {avatarInitials}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white truncate">{userName}</p>
          <p className="text-sm text-link opacity-90 truncate">
            {userEmail || "No email available"}
          </p>
        </div>
      </SignedIn>
    </div>
  );
};

export default ProfileSection;
