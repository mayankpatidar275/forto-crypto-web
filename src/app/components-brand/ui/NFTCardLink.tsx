import Link from "next/link";

import { NFTWithType, SelectedNftType } from "@/types/nft";
import CrystalCard from "./CrystalCard";

interface NFTCardLinkProps {
  nft: NFTWithType;
  onClick: (nft: SelectedNftType) => void;
}

const NFTCardLink = ({ nft, onClick }: NFTCardLinkProps) => (
  <div className="w-36">
    <Link
      href={`/buy-nfts/${nft.title}`}
      className="block"
      onClick={() => onClick(nft)}
    >
      <CrystalCard nft={nft} />
    </Link>
  </div>
);

export default NFTCardLink;
