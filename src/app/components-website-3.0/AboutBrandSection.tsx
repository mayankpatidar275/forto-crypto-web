import React from "react";

interface Feature {
  text: string;
  icon?: React.ReactNode; // Optional custom icon
}

interface AboutBrandSectionProps {
  brandName: string;
  tagline?: string;
  features: Feature[];
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textGradientFrom?: string;
  textGradientTo?: string;
  dotColor?: string;
  className?: string;
  maxWidth?: string;
}

const AboutBrandSection: React.FC<AboutBrandSectionProps> = ({
  brandName,
  tagline = "🎉",
  features,
  backgroundColor = "p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl w-full shadow-2xl",
  gradientFrom = "from-heading",
  gradientTo = "to-brand-br1",
  dotColor = "bg-green-400",
  className = "",
  maxWidth = "max-w-4xl",
}) => {
  return (
    <section className={`cp-x cp-y flex justify-center ${className}`}>
      <div className={maxWidth}>
        <div className="flex flex-col items-center gap-8">
          <div className={backgroundColor}>
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}
                >
                  {brandName}
                  {tagline && `! ${tagline}`}
                </h3>
              </div>
              {/* Features grid */}
              <div className="grid md:grid-cols-2 gap-4 py-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    {feature.icon || (
                      <div className={`w-2 h-2 ${dotColor} rounded-full`}></div>
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrandSection;
