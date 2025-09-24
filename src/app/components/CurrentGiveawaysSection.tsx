import Image from "next/image";
import Heading2 from "./ui/Heading2";
import { CurrentGiveaways } from "../assets";

function CurrentGiveawaysSection() {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <Heading2>Current Giveaways</Heading2>
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
