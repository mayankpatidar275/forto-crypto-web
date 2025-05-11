import React from "react";

type LabelProps = {
  text: string;
};

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <div className="border-2 block w-fit tracking-widest border-background-b1 text-brand-br1 uppercase rounded-xl mt-0 mb-4 p-2.5 px-4 text-sm leading-snug">
      {text}
    </div>
  );
};

export default Label;
