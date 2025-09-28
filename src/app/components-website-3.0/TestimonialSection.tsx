import Heading4 from "./ui/Heading4";
import TestimonialCard from "./ui/TestimonialCard";

const TestimonialSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center testimonial-section">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col items-center lg:items-end gap-4 h-full justify-center">
          <Heading4 className="uppercase">
            What customers and brands are saying about us
          </Heading4>
          <div className="flex flex-col gap-4">
            <TestimonialCard
              name={"Name"}
              address={"Address"}
              testimonial={"Testimonial"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
