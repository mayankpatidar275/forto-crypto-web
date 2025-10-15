import React from "react";

const AboutBrandSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          {/* <Heading2 className="mb-0 text-center">🏆 About the Brand</Heading2> */}

          <div className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl w-full shadow-2xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-heading to-brand-br1 bg-clip-text text-transparent">
                  {/* Win Shopping Credits at  */}
                  6thStreet.com! 🎉
                </h3>
              </div>

              {/* Main content */}
              {/* <p className="text-gray-300 text-lg leading-relaxed text-center">
                Get ready to style up and win big! Participate now for a chance
                to earn
                <span className="font-semibold text-white">
                  {" "}
                  free shopping credits{" "}
                </span>
                on 6thStreet.com - your ultimate fashion destination.
              </p> */}

              {/* Features grid */}
              <div className="grid md:grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>2000+ international brands</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Fashion, beauty, home & more</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Valid across UAE, KSA & Oman</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Direct credits to your account</span>
                </div>
              </div>

              {/* How it works */}
              {/* <div className="bg-gray-800/50 rounded-2xl p-6">
                <h4 className="font-bold text-white text-lg mb-4">
                  🚀 How it works:
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p>• Fill the form below to enter the draw</p>
                  <p>
                    • Winners get shopping credits directly to 6thStreet account
                  </p>
                  <p>• Shop 2000+ brands across multiple categories</p>
                  <p>• Credits valid platform-wide</p>
                </div>
              </div> */}

              {/* CTA */}
              {/* <div className="text-center pt-4">
                <p className="text-xl font-bold text-white">
                  Your next shopping spree could be on us! ✨
                </p>
                <p className="text-gray-400 mt-2">
                  Complete your entry and win exclusive rewards from the Middle
                  East&apos;s leading fashion platform.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrandSection;
