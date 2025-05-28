import Heading2 from "./ui/Heading2";
import WinnerTileHorizontal from "./ui/WinnerTileHorizontal";

const dummyWinners = [
  {
    name: "Alice Johnson",
    location: "New York, USA",
    amount: "$5,000",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Alice Johnson",
    location: "New York, USA",
    amount: "$5,000",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Mehta",
    location: "Delhi, India",
    amount: "$3,200",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sofia Mendes",
    location: "Lisbon, Portugal",
    amount: "$4,750",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam Smith",
    location: "Sydney, Australia",
    amount: "$6,100",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const WinnersSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="Check" /> */}
        <Heading2>Our Recent Winners</Heading2>
        {/* <div className="flex flex-wrap justify-center gap-6 pt-10">
          {dummyWinners.map((winner, index) => (
            <WinnerTile key={index} {...winner} />
          ))}
        </div> */}
        <div className="flex flex-col gap-4 w-full items-center pt-10">
          {dummyWinners.map((winner, index) => (
            <WinnerTileHorizontal key={index} {...winner} />
          ))}
        </div>
        {/* <div>
          <Label2 text="Get Started" />
        </div> */}
      </div>
    </section>
  );
};

export default WinnersSection;
