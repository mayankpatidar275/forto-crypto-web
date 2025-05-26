type Winner = {
  name: string;
  location: string;
  amount: string;
  image: string;
};

const WinnerTileHorizontal = ({ name, location, amount, image }: Winner) => {
  return (
    <div className="flex items-center justify-between bg-background-b3 rounded-xl shadow-sm px-4 py-3 w-full max-w-3xl hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="text-sm text-link opacity-70">{location}</p>
        </div>
      </div>
      <div className="text-white font-bold text-lg">{amount}</div>
    </div>
  );
};

export default WinnerTileHorizontal;
