import React from "react";

interface CrystalCardProps {
  image: string;
  alt: string;
}

const CrystalCard: React.FC<CrystalCardProps> = ({ image, alt }) => {
  return (
    <div className="nft-card-item flex justify-center items-center w-[80%] sm:w-[40%] md:w-[20%]">
      <img
        src={image}
        alt={alt}
        className="nft-preview-image w-full h-auto object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
    </div>
  );
};

export default CrystalCard;
