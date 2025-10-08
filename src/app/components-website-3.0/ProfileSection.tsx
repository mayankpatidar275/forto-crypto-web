"use client";

import React from "react";
import { useAuth, useUser } from "@clerk/nextjs";

const ProfileSection = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Function to extract initials from email
  const getInitialsFromEmail = (email: string | undefined): string => {
    if (!email) return "GU";

    // Extract the part before @ and get first two characters
    const username = email.split("@")[0];

    // If username has dots or other separators, use first letters of parts
    if (username.includes(".")) {
      const parts = username.split(".");
      return parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : username.substring(0, 2).toUpperCase();
    }

    // Otherwise use first two characters of username
    return username.substring(0, 2).toUpperCase();
  };

  // Function to generate a consistent color based on email
  const getColorFromEmail = (email: string | undefined): string => {
    if (!email) return "#3B82F6";

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
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  // Get email from Clerk user object
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const avatarInitials = getInitialsFromEmail(userEmail);
  const avatarBgColor = getColorFromEmail(userEmail);

  if (!isSignedIn) {
    return (
      <div className="flex gap-4 items-center bg-background-b3 rounded-xl shadow-sm p-6 w-full hover:shadow-md transition-all duration-300 max-w-md mx-auto">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600 flex-shrink-0">
          <span className="text-white font-bold text-lg">GU</span>
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white">Guest User</p>
          <p className="text-sm text-link opacity-90">Please sign in</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center bg-background-b3 rounded-xl shadow-sm p-6 w-full hover:shadow-md transition-all duration-300 mx-auto">
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg flex-shrink-0"
        style={{ backgroundColor: avatarBgColor }}
      >
        {avatarInitials}
      </div>
      <div className="min-w-0">
        <p className="font-medium text-white truncate">
          {userEmail ? userEmail.split("@")[0] : "User"}
        </p>
        <p className="text-sm text-link opacity-90 truncate">
          {userEmail || "No email available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
