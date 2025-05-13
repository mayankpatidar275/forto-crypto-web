import React from "react";

interface CrystalCardProps {
  image: string;
  alt: string;
}

const CrystalCard: React.FC<CrystalCardProps> = ({ image, alt }) => {
  return (
    <div className="nft-card-item flex justify-center items-center w-full sm:w-[45%] md:w-[30%]">
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
