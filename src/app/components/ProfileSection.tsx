import Image from "next/image";
import React from "react";

const user = {
  name: "Mayank Patidar",
  email: "mayank@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const ProfileSection = () => {
  return (
    <div className="flex gap-4 items-center bg-background-b3 rounded-xl shadow-sm p-6 w-full hover:shadow-md transition">
      <div className="relative w-12 h-12">
        <Image
          src={user.avatar}
          alt={`avatar`}
          fill
          className="rounded-full object-cover"
          sizes="48px"
          priority={false}
        />
      </div>
      <div>
        <p className="font-medium text-white">{user.name}</p>
        <p className="text-sm text-link opacity-70">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
