import React from "react";

interface NFTItemProps {
  id: string;
  name: string;
  image: string;
  mintAddress: string;
}

const NFTItemCard: React.FC<NFTItemProps> = ({ name, image, mintAddress }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-background-b2 rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1">
        <h4 className="text-lg font-medium">{name}</h4>
        <p className="text-sm text-gray-500">
          Mint: {mintAddress.slice(0, 4)}...{mintAddress.slice(-4)}
        </p>
      </div>
    </div>
  );
};

export default NFTItemCard;
