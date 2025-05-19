import { Mail, MessageCircle, Send } from "lucide-react";
import ContactCard from "./ui/ContactCard";
import Heading2 from "./ui/Heading2";
import Label from "./ui/Label";

const contacts = [
  {
    icon: <Send size={32} className="text-brand-br1" />,
    title: "Telegram",
    description: "@TelegramHandle",
    href: "https://t.me/TelegramHandle",
  },
  {
    icon: <Mail size={32} className="text-brand-br1" />,
    title: "Email Us",
    description: "support@forto.com",
    href: "mailto:support@forto.com",
  },
  {
    icon: <MessageCircle size={32} className="text-brand-br1" />,
    title: "Join Discord",
    description: "Hop into our community",
    href: "https://discord.gg/yourserver",
  },
];

const ContactSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="Contact Us" />
        <Heading2>You can contact us on</Heading2>
        {/* <div className="mb-8">
          <Para1>
            Whether you need custom AI training solutions, scalable models, or
            expert guidance, we are here to help. Get in touch and let us unlock
            the next stage of AI innovation—together.
          </Para1>
        </div> */}
        <div className="flex flex-wrap justify-center gap-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
