export const CrystalCardSkeleton = () => (
  <div className="nft-card-item flex flex-col justify-center items-center w-[80%] sm:w-[40%] md:w-[20%] gap-2">
    <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
  </div>
);
