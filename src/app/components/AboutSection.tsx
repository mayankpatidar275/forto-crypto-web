import Heading2 from "./ui/Heading2";
import Label from "./ui/Label";
import Para1 from "./ui/Para1";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Right Content */}
        <div className="flex flex-col items-center lg:items-start gap-4 h-full justify-center">
          <Label text="About us" />
          <Heading2 className="lg:text-left">Shaping the Future of AI</Heading2>
          <Para1 className="lg:text-left">
            AI is transforming the world, but developing high-performance models
            shouldn’t be a privilege reserved for a few. At TrainAI, we build
            efficient, scalable, and ethical AI training models—designed to push
            the boundaries of what’s possible.
          </Para1>
        </div>

        {/* Left Content */}
        <div className="flex flex-col items-center gap-6">
          <figure className="flex flex-col justify-center items-center -z-1 w-full mb-10 relative overflow-hidden">
            <Image
              src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e5e9377ed62684eb7b990_Shape2-min.avif"
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

export default AboutSection;
