// import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
// import Para1 from "./ui/Para1";
import { Check } from "lucide-react";

const FortoVsTraditional = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          {/* <Label text="About us" /> */}
          <Heading2 className="">FORTO vs TRADITIONAL GIVEAWAYS</Heading2>
          <div className="lg:text-left md:flex w-full">
            <ul className="flex flex-col lg:flex-row justify-self-start gap-2 lg:gap-8">
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
      </div>
    </section>
  );
};

export default FortoVsTraditional;
