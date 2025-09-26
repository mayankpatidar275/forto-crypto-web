import Image from "next/image";
import Heading2 from "./ui/Heading2";
import { CurrentGiveaways, Street, WhiteLogo } from "../assets";

function CurrentGiveawaysSection() {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <Heading2>Current Giveaways</Heading2>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex gap-4">
            <div>
              <Image
                src={WhiteLogo}
                alt="Logo"
                className="h-5 sm:h-8 w-auto"
                width={150}
                height={50}
                priority
              />
            </div>
            <span>x</span>
            <div>
              <Image
                src={Street}
                alt="6thStreetLogo"
                className="h-5 sm:h-8 w-auto invert"
                width={150}
                height={50}
                priority
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="title">
              50,0000
              <div className="aurora">
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
              </div>
            </h1>

            <span className="text-4xl">GIVEAWAY</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span>50% WINNERS, 100% FAIR</span>
            <span>TRANSPARENT ON BLOCKCHAIN</span>
          </div>
        </div>
        <figure className="flex justify-center items-center mb-10 relative overflow-hidden image-gradient-container">
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
        </figure>
      </div>
    </section>
  );
}

export default CurrentGiveawaysSection;
