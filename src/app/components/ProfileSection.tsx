import React from "react";

const user = {
  name: "Mayank Patidar",
  email: "mayank@example.com",
  avatar: "/default-avatar.png",
};

const ProfileSection = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-6">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="w-20 h-20 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
