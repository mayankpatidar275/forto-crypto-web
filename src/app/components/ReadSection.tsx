import React from "react";
import Label from "./ui/Label";
import Heading2 from "./ui/Heading2";
import Para1 from "./ui/Para1";
import BlogCard from "./ui/BlogCard";
import Label2 from "./ui/Label2";

const blogPosts = [
  {
    title: "How to Integrate AI into Business Strategies With Efficiency",
    description:
      "Learn how to effectively integrate AI into your business strategies for better outcomes.",
    image:
      "https://cdn.prod.website-files.com/679e7f37b8ee13675f5482c3/679f27e4878f40ec11683667_ImagePlaceholder3.avif",
    category: "Business",
    link: "/blog-post/ai-in-business-2",
  },
  {
    title: "The Future of AI Training: Faster and Smarter",
    description:
      "Discover how cutting-edge techniques are revolutionizing AI training, reducing costs, and boosting model efficiency.",
    image:
      "https://cdn.prod.website-files.com/679e7f37b8ee13675f5482c3/679f27b8f2d09eaa0a3c2e6b_ImagePlaceholder.avif",
    category: "AI Trends",
    link: "/blog-post/ai-in-healthcare-5",
  },
  {
    title: "How to Prevent Bias in AI Models: Best Practices for Ethical AI",
    description:
      "Learn how curated datasets and explainability techniques help build fairer, bias-free AI models.",
    image:
      "https://cdn.prod.website-files.com/679e7f37b8ee13675f5482c3/679f27c785f613015a137ee9_ImagePlaceholder1.avif",
    category: "AI Ethics",
    link: "/blog-post/ai-and-education-4",
  },
];
const ReadSection = () => {
  return (
    <section className="cp-x py-20 flex justify-center">
      <div className="max-w-6xl flex flex-col justify-center items-center">
        <Label text="READ" />
        <Heading2>Insights & AI Innovations</Heading2>
        <div className="mb-8">
          <Para1>
            Stay ahead of the curve with our latest insights on AI training,
            model optimization, and industry breakthroughs.
          </Para1>
        </div>
        <div className="flex flex-wrap justify-center gap-6 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
        <div>
          <Label2 text="Discover All Our Articles" />
        </div>
      </div>
    </section>
  );
};

export default ReadSection;
