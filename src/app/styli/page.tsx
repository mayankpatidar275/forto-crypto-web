"use client";

import { useEventById } from "@/custom-hooks/queries";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Fashion, Home, Kids, Mens } from "../assets";
import AboutBrandSection from "../components-website-3.0/AboutBrandSection";
import FortoXStyli from "../components-website-3.0/FortoXStyli";
import ParticipationForm from "../components-website-3.0/ParticipationForm";
import TermsSection from "../components-website-3.0/TermsSection";
import CountDown from "../components-website-3.0/ui/CountDown";
import Heading2 from "../components-website-3.0/ui/Heading2";
import Loader from "../components-website-3.0/ui/Loader";

function ParticipatePage() {
  const { isLoaded } = useUser();

  const {
    data: event,
    isLoading: isLoadingEvent,
    error,
  } = useEventById("386e4d08-0b04-45d5-9c1c-a4b675826f4e");

  if (isLoadingEvent || !isLoaded) {
    return (
      <div className="flex justify-center items-center mt-30">
        <Loader />
      </div>
    );
  }

  if (!event || !event.data || !event.data.status) {
    return (
      <div className="flex justify-center items-center mt-30">
        Oops! Something went wrong
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-30">
        Oops! Something went wrong
      </div>
    );
  }

  return (
    <div className="cp-y">
      <section className="cp-x cp-y mt-10">
        <FortoXStyli />
      </section>

      {/* Updated AboutBrandSection with StyliShop features */}
      <AboutBrandSection
        brandName="StyliShop"
        tagline="🛍️"
        features={[
          { text: "1000+ international & local brands" },
          { text: "Fashion, electronics, home & lifestyle" },
          { text: "Free shipping across UAE" },
          { text: "Easy returns & exchanges" },
          { text: "Secure payment options" },
          { text: "24/7 customer support" },
        ]}
        backgroundColor="p-8 bg-gradient-to-br from-purple-900 to-blue-900 rounded-3xl w-full shadow-2xl"
        dotColor="bg-purple-400"
        gradientFrom="from-purple-400"
        gradientTo="to-pink-400"
      />

      <section className="cp-x cp-y flex justify-center">
        <div className="max-w-6xl">
          {/* Right Content */}
          <div className="flex flex-col items-center gap-4 h-full justify-center">
            <Heading2>Draw ends in</Heading2>
            <CountDown targetDate={event.data.endDate} />
          </div>
        </div>
      </section>

      <ParticipationForm />

      <TermsSection />
      {/* Horizontal Scrolling Carousel */}
      <div className="w-full mb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Featured Collections
          </h3>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
            {[
              {
                src: Fashion,
                alt: "Latest Fashion Trends",
                label: "Women's Fashion",
                desc: "Stay trendy",
              },
              {
                src: Kids,
                alt: "Kids Fashion & Toys",
                label: "Kids World",
                desc: "Fun & playful",
              },
              {
                src: Home,
                alt: "Home Decor & Essentials",
                label: "Home Living",
                desc: "Create your space",
              },
              {
                src: Mens,
                alt: "Men's Style Collection",
                label: "Men's Fashion",
                desc: "Modern looks",
              },
            ].map((item, index) => (
              <div key={index} className="flex-none w-64 snap-center">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      width={256}
                      height={192}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-gray-800">{item.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Style */}
      <div className="w-full mb-16 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-square md:aspect-auto">
              <Image
                src={Fashion} // Use your best image here
                alt="StyliShop - Your Ultimate Shopping Destination"
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden" />
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Discover Endless Possibilities
              </h3>
              <p className="text-gray-200 mb-6">
                Explore thousands of products across fashion, home, electronics
                and more. Free shipping across UAE with easy returns.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🚚", text: "Free Shipping" },
                  { icon: "↩️", text: "Easy Returns" },
                  { icon: "🛡️", text: "Secure Payments" },
                  { icon: "⏰", text: "24/7 Support" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipatePage;
