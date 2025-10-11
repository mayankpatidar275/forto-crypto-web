import { Instagram, Mail, Send, X } from "lucide-react";
import ContactCard from "./ui/ContactCard";
import Heading2 from "./ui/Heading2";
import StatCard3 from "./ui/StatCard2";
import { socialLinks } from "../data/data";
// import Label from "./ui/Label";

const contacts = [
  {
    icon: <Mail size={40} className="text-brand-br1" />,
    title: "Email Us",
    description: "hello@fortotoken.com",
    href: socialLinks.email.href,
  },
  {
    icon: <X size={40} className="text-brand-br1" />,
    title: "X",
    description: "@fortotoken",
    href: socialLinks.x.href,
  },
  {
    icon: <Instagram size={40} className="text-brand-br1" />,
    title: "Instagram",
    description: "@fortotoken",
    href: socialLinks.instagram.href,
  },
  {
    icon: <Send size={40} className="text-brand-br1" />,
    title: "Telegram",
    description: "Join Community",
    href: socialLinks.telegram.href,
  },
  // {
  //   icon: <MessageCircle size={32} className="text-brand-br1" />,
  //   title: "Join Discord",
  //   description: "Hop into our community",
  //   href: "https://discord.gg/yourserver",
  // },
];

const ContactSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="Contact Us" /> */}
        <Heading2>Contact Us</Heading2>
        {/* <div className="mb-8">
          <Para1>
            Whether you need custom AI training solutions, scalable models, or
            expert guidance, we are here to help. Get in touch and let us unlock
            the next stage of AI innovation—together.
          </Para1>
        </div> */}
        <div className="flex flex-col items-center gap-6 md:hidden w-[90vw]">
          {contacts.map((item, index) => (
            <StatCard3
              key={index}
              value={item.title}
              label={item.description}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((contact, index) => (
              <ContactCard
                key={index}
                icon={contact.icon}
                title={contact.title}
                description={contact.description}
                href={contact.href}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <Label2 text="Have a project? Let us talk." />
        </div> */}
      </div>
    </section>
  );
};

export default ContactSection;
