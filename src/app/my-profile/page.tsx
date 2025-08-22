import React from "react";

import Logout from "../components/ui/Logout";
import ProfileSection from "../components/ProfileSection";
import PurchaseHistory from "../components/PurchaseHistory";
// import WalletNFTs from "../components/WalletNfts";

const MyProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>
      <ProfileSection />
      {/* <WalletNFTs /> */}
      <PurchaseHistory />
      <Logout />
    </div>
  );
};

export default MyProfilePage;
