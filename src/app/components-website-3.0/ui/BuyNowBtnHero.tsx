"use client";

import { useRouter } from "next/navigation";

export default function BuyNowBtnHero() {
  const router = useRouter();
  // const scrollToSection = (id: string) => {
  //   const element = document.getElementById(id);
  //   element?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <button
      // onClick={() => scrollToSection("get-now")}
      onClick={() => router.push("/brand")}
      className="inline-block border-2 border-brand-br2 text-brand-br1 pointer px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
    >
      Join Giveaway
    </button>
  );
}
