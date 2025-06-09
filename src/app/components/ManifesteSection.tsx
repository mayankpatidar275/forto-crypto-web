import React from "react";
import Para1 from "./ui/Para1";
import Heading2 from "./ui/Heading2";
import Label from "./ui/Label";
// import FeatureCard, { Feature } from "./ui/FeatureCard";

// const features: Feature[] = [
//   {
//     title: "Accessible",
//     description:
//       "AI innovation should be within reach for startups, enterprises, and researchers alike.",
//     icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f0c44878f40ec114d58c6_user.svg",
//     alt: "User Icon",
//   },
//   {
//     title: "Efficient",
//     description:
//       "Smarter models require fewer resources, reducing costs and environmental impact.",
//     icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f0c44d768870c747456ac_refresh-ccw.svg",
//     alt: "Recycling Icon",
//   },
//   {
//     title: "Trustworthy",
//     description:
//       "Transparency and fairness must be at the core of AI development.",
//     icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f0c4423fdbf74ed51c1cd_edit.svg",
//     alt: "Edit Icon",
//   },
//   {
//     title: "Scalable",
//     description: "AI should grow with your needs, not hold you back.",
//     icon: "https://cdn.prod.website-files.com/679e441b90452288c5c37443/679f0c44c06be5ba91c03713_arrow-up-right.svg",
//     alt: "Arrow Right Up Icon",
//   },
// ];

const ManifesteSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="Contact" />
        <Heading2>
          AI That Works <br /> for Everyone
        </Heading2>
        <div className="mb-8">
          <Para1>
            Our Vision for a Smarter, Fairer, and More Responsible AI Future We
            believe AI should be :
          </Para1>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default ManifesteSection;
