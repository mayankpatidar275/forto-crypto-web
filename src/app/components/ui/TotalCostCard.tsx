export const TotalCostCard = ({
  total,
  onBuy,
  loading = false,
}: {
  total: number;
  onBuy: () => void;
  loading?: boolean;
}) => (
  <div className="fixed bottom-0 right-0 left-0 sm:bottom-6 flex justify-between gap-4 sm:right-6 sm:left-1/2 md:left-2/3 sm:border-2 border-brand-br2 sm:w-auto sm:min-w-[260px] bg-background rounded-lg p-4 shadow-xl text-white z-100">
    <div>
      <div className="text-sm font-medium text-link">Total Cost</div>
      <div className="text-2xl font-bold text-link">
        {total.toFixed(2)} FORTO
      </div>
    </div>
    <button
      onClick={onBuy}
      disabled={loading}
      className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
    >
      Buy
    </button>
  </div>
);
