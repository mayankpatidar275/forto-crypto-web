import React from "react";
import Label2 from "./ui/Label2";
import Para1 from "./ui/Para1";
import Heading2 from "./ui/Heading2";
import Label from "./ui/Label";

const ContactSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="Contact" />
        <Heading2>
          Let us Build the Future <br /> of AI Together
        </Heading2>
        <div className="mb-8">
          <Para1>
            Whether you need custom AI training solutions, scalable models, or
            expert guidance, we are here to help. Get in touch and let us unlock
            the next stage of AI innovation—together.
          </Para1>
        </div>
        <div>
          <Label2 text="Have a project? Let us talk." />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
