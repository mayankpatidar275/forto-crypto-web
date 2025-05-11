import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";

function WhatSection() {
  return (
    <section className="cp-x py-6">
      <div className="flex flex-col justify-center items-center">
        <Label text="WHAT WE DO" />
        <Heading2>
          Your AI&nbsp;models <br /> deserve better
        </Heading2>
        <Para1>
          Building AI is challenging, but it shouldn't be a roadblock. We solve
          the biggest hurdles in AI training—so you can focus on innovation, not
          limitations.
        </Para1>
      </div>
    </section>
  );
}

export default WhatSection;
