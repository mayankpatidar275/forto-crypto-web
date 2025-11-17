import { useCart } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  const { state } = useAppContext();
  const { data: myCart } = useCart(state.userClerkId);

  const itemCount = myCart?.data?.items?.length || 0;

  return (
    <div className="flex items-center space-x-4">
      <Link href="/cart" className="relative sm:btn-primary">
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center">
          <ShoppingCart />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-brand-br1 text-white text-[10px] sm:text-xs px-[6px] py-[1px] leading-none font-medium">
              {itemCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartBtn;
