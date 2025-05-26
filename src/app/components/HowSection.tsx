import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";

const HowSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="How" /> */}
        <Heading2>How it works?</Heading2>
        <div className="mb-8">
          <Para1>
            Every month, you&#39;ll have the chance to win a share of the prize
            pool that&#39;s been set aside just for our community. The more
            tickets you hold, the greater your chances of winning — it&#39;s
            that simple!
          </Para1>
          <Para1>
            Curious about how the prize pool works, your odds, or how everything
            is structured? 👉 Check out our [Tokenomics page] for all the
            details.
          </Para1>
        </div>
        {/* <div className="flex flex-wrap justify-center gap-6 py-10">
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
        </div> */}
        {/* <div>
          <Label2 text="Have a project? Let us talk." />
        </div> */}
      </div>
    </section>
  );
};

export default HowSection;
