import React from "react";
import Logout from "../../components/ui/Logout";
import ProfileSection from "../../components/ProfileSection";
import PurchaseHistory from "../../components/PurchaseHistory";
import SpinButton from "../../components/ui/SpinButton";

const MyProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with SpinButton aligned to the right */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <SpinButton />
      </div>

      <ProfileSection />
      <PurchaseHistory />
      <Logout />
    </div>
  );
};

export default MyProfilePage;
