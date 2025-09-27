// import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
// import Para1 from "./ui/Para1";
import { Check } from "lucide-react";
import Image from "next/image";
import { CustomersWinMore } from "../assets";

const FortoVsTraditional = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="">FORTO vs TRADITIONAL GIVEAWAYS</Heading2>
          <div className="lg:text-left md:flex">
            <ul className="flex flex-col justify-self-start gap-2">
              <li className="flex text-very-light-pink items-center">
                <span className="bg-[#331910] rounded-full h-7 w-7 flex justify-center items-center mr-4">
                  <Check className="text-[#ff8730] p-1" />
                </span>{" "}
                50% of participants win{" "}
              </li>
              <li className="flex text-very-light-pink items-center">
                <span className="bg-[#331910] rounded-full h-7 w-7 flex justify-center items-center mr-4">
                  <Check className="text-[#ff8730] p-1" />
                </span>{" "}
                Pay only on redemption{" "}
              </li>
              <li className="flex text-very-light-pink items-center">
                <span className="bg-[#331910] rounded-full h-7 w-7 flex justify-center items-center mr-4">
                  <Check className="text-[#ff8730] p-1" />
                </span>{" "}
                High participation and repeat draws{" "}
              </li>
              <li className="flex text-very-light-pink items-center">
                <span className="bg-[#331910] rounded-full h-7 w-7 flex justify-center items-center mr-4">
                  <Check className="text-[#ff8730] p-1" />
                </span>{" "}
                Blockchain-verified fairness{" "}
              </li>
            </ul>
          </div>
        </div>

        {/* Left Content */}
        <div className="lg:flex flex-col items-center gap-6 hidden">
          <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
            <Image
              src={CustomersWinMore}
              alt="Decorative shape"
              width={800} // pick an appropriate width (can adjust)
              height={600} // pick an appropriate height (can adjust)
              sizes="(max-width: 767px) 83vw, 500px"
              className="h-full max-w-full w-auto inline-block"
              priority={false}
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default FortoVsTraditional;
