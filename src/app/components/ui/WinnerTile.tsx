type Winner = {
  name: string;
  location: string;
  amount: string;
  image: string;
};

const WinnerTile = ({ name, location, amount, image }: Winner) => {
  return (
    <div className="flex flex-col items-center text-center bg-background-b3 rounded-2xl shadow-md p-6 w-64 transition hover:shadow-lg">
      <img
        src={image}
        alt={`${name}'s avatar`}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="mt-2 font-bold text-xl">{amount}</p>
    </div>
  );
};

export default WinnerTile;
