import React from "react";
import Heading2 from "./ui/Heading2";

const AboutBrandSection = () => {
  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl">
        <div className="flex flex-col items-center gap-4 h-full justify-center">
          <Heading2 className="mb-0">About Brand</Heading2>
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-background rounded-2xl w-full">
              <div className="relative">
                <div className="text-sm text-text-color max-w-6xl mx-auto text-justify">
                  <span className="text-white">
                    {" "}
                    Win Shopping Credits at 6thStreet.com! 🎉
                  </span>{" "}
                  Get ready to style up and win big! Participate now for a
                  chance to earn free shopping credits on 6thStreet.com - your
                  favorite fashion destination for brands like Mango, Charles &
                  Keith, Nike and 2000+ other international brands.
                  <br />
                  <br />
                  <span className="text-white"> How it works:</span> Fill the
                  form below to enter the draw Winners get shopping credits
                  directly to their 6thStreet account Shop your favorite brands
                  across fashion, beauty, home & more Credits valid across their
                  entire platform in UAE, KSA & Oman
                  <span className="text-white">
                    {" "}
                    Your next shopping spree could be on us! ✨
                  </span>{" "}
                  Complete your entry and get ready to win exclusive shopping
                  rewards from the Middle East&apos;s leading fashion e-commerce
                  platform.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrandSection;
