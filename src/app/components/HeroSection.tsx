import React from "react";

function HeroSection() {
  return (
    <section className="section-hero cp-x">
      <div className="mt-6">
        <div className="px-6 py-14 text-center flex flex-col items-center">
          <div className="border-2 block w-fit tracking-widest border-background-b1 text-brand-br1 uppercase rounded-xl mt-0 mb-4 p-2.5 px-4 text-sm leading-snug">
            AI TRAINER MODELS SOLUTION
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-heading to-brand-br1 leading-tight mb-6 max-w-5xl">
            Unlock the Full Potential of Your AI Models
          </h1>

          <p className="text-lg md:text-xl text-link font-semibold max-w-3xl mx-auto mb-8">
            We develop cutting-edge AI training models to accelerate your
            innovation. Smarter, faster, and more efficient AI starts here.
          </p>
          <a
            href="/contact"
            className="inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Get Started
          </a>
        </div>

        <div></div>
      </div>
    </section>
  );
}

export default HeroSection;
