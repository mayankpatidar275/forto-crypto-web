import React from "react";
import ProfileSection from "../components-website-3.0/ProfileSection";
import Logout from "../components-website-3.0/ui/Logout";
// import PurchaseHistory from "../../components/PurchaseHistory";

const MyProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 mt-20">
      {/* Header with SpinButton aligned to the right */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {/* <SpinButton /> */}
      </div>

      <ProfileSection />
      {/* <PurchaseHistory /> */}
      <Logout />
    </div>
  );
};

export default MyProfilePage;
