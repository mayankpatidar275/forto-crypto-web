import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/cart" className="sm:btn-primary">
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center">
          <ShoppingCart />
        </div>
      </Link>
    </div>
  );
};

export default CartBtn;
