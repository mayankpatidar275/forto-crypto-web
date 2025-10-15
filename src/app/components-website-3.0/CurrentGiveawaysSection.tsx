"use client";

import Heading2 from "./ui/Heading2";
import { useRouter } from "next/navigation";
import FortoXBrand from "./FortoXBrand";

function CurrentGiveawaysSection() {
  const router = useRouter();
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <Heading2>Current Giveaways</Heading2>
        <div className="flex flex-col justify-center items-center gap-4">
          <FortoXBrand />
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center justify-items gap-4">
              <h1 className="title">
                50,0000
                <div className="aurora">
                  <div className="aurora__item"></div>
                  <div className="aurora__item"></div>
                  <div className="aurora__item"></div>
                  <div className="aurora__item"></div>
                </div>
              </h1>{" "}
              <span className="title text-very-light-pink"> AED</span>
            </div>
            <span className="text-5xl neon-text">GIVEAWAY</span>
          </div>
          <div className="flex flex-col justify-center items-center text-2xl">
            <span className="text-center">50% WINNERS, 100% FAIR</span>
            <span className="text-center">TRANSPARENT ON BLOCKCHAIN</span>
          </div>
          <div
            onClick={() => router.push("/6thstreet")}
            className="bg-white sm:font-semibold text-sm sm:text-lg cursor-pointer text-background hover:text-white hover:bg-brand-br1 text-center rounded-[30px] px-3.5 py-1.5 sm:px-7 sm:py-2.5 leading-[1.4] hover:scale-[0.93] transition-all duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Join Giveaway
          </div>
        </div>
        {/* <figure className="flex justify-center items-center mb-10 relative overflow-hidden image-gradient-container">
          <Image
            src={CurrentGiveaways}
            alt=""
            role="presentation"
            aria-hidden="true"
            className="h-full w-auto inline-block"
            loading="lazy"
            sizes="(max-width: 767px) 93vw, 1000px"
            width={8000}
            height={8000}
            style={{ height: "100%", width: "auto" }}
          />
        </figure> */}
      </div>
    </section>
  );
}

export default CurrentGiveawaysSection;
