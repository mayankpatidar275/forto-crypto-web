import React from "react";

type Label2Props = {
  text: string;
};

const Label2: React.FC<Label2Props> = ({ text }) => {
  return (
    <div className="border-2 block w-fit tracking-wider border-brand-br2 text-white rounded-xl mt-0 mb-4 p-4 px-8 font-semibold leading-snug">
      {text}
    </div>
  );
};

export default Label2;
