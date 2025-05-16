import { LucideProps } from "lucide-react";
import React, { ReactNode } from "react";
import Para2 from "./Para2";

type ContactCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
};

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  return (
    <a href={href}>
      <div className="flex flex-col gap-4 lg:gap-6 items-center px-12 py-14 rounded-2xl bg-background-b3 max-w-2xl">
        {icon}

        <h6 className="text-white text-lg lg:text-3xl text-center md:text-xl font-bold max-w-xl mx-auto">
          {title}
        </h6>
        <Para2>{description}</Para2>
      </div>
    </a>
  );
};

export default ContactCard;
