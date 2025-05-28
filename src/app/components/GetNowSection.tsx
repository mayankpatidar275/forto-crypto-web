import CrystalCard from "./ui/CrystalCard";
import Heading2 from "./ui/Heading2";

const imageData = [
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101d16f4d9716e605177b4_Frame%2011.png",
    alt: "No. 88",
  },
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101cf5dfb5094a8c6634a9_Frame%2010.png",
    alt: "No. 3",
  },
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101cd1f35873083286be7f_Frame%209.png",
    alt: "No. 55",
  },
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101cb6ed5bbaf1b5240553_Frame%208.png",
    alt: "No. 97",
  },
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101c8e3fb647d46557bb9e_Frame%207.png",
    alt: "No. 12",
  },
  {
    image:
      "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101a567b026d639ec83061_Frame%206.png",
    alt: "No. 34",
  },
];

const GetNowSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="block-heading px-6 pb-14 text-center flex flex-col items-center">
          {/* <Label text="Get Now" /> */}
          <Heading2>Get your unique NFT ticket now</Heading2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {imageData.map((card, index) => (
            <CrystalCard key={index} image={card.image} alt={card.alt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetNowSection;
