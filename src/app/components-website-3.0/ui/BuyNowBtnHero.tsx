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
      onClick={() => router.push("/6thstreet")}
      className="bg-white sm:font-semibold text-sm sm:text-lg cursor-pointer text-background hover:text-white hover:bg-brand-br1 text-center rounded-[30px] px-3.5 py-1.5 sm:px-7 sm:py-2.5 leading-[1.4] hover:scale-[0.93] transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
    >
      Join Giveaway
    </button>
  );
}
