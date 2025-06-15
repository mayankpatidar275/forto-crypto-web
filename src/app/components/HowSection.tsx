import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";

const HowSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        {/* <Label text="How" /> */}
        <Heading2>How it works?</Heading2>
        <div className="">
          <Para1>
            Buy 100 FORTO to mint your NFT lottery ticket—60 FORTO fuels the
            prize pool, 35 FORTO covers operations/marketing, 4 FORTO rewards
            the community, and 1 FORTO is burned. Your ticket automatically
            enters three monthly draws (M1, M2, M3) where a single Mega winner
            takes 50 % of that draw’s pool, while up to 42 % of participants
            split the remaining 50 % (25 % to “Mid” winners and 25 % to “Micro”
            winners, with Mid prizes equal to 4× each Micro prize). Winners
            receive FORTO directly, NFTs stay tradable (new owners inherit draw
            entries), and you can stake any leftover FORTO for APY. Dive into
            the details on our How It Works page!
          </Para1>
          {/* <Para1>
            Every month, you&#39;ll have the chance to win a share of the prize
            pool that&#39;s been set aside just for our community. The more
            tickets you hold, the greater your chances of winning — it&#39;s
            that simple!
          </Para1>
          <Para1>
            Curious about how the prize pool works, your odds, or how everything
            is structured? 👉 Check out our [Tokenomics page] for all the
            details.
          </Para1> */}
        </div>
        {/* <div className="flex flex-wrap justify-center gap-6">
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
