import React from "react";
import Image from "next/image";
import Para1 from "./Para1";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  category,
  link,
}) => {
  return (
    <a
      href={link}
      aria-label={`Link to the post: ${title}`}
      className="bg-background-b3 border border-black rounded-[15px] p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="flex flex-col items-center w-full mb-5">
        <div className="relative h-[180px] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={false}
          />
        </div>
      </div>
      <div className="text-sm font-semibold text-link italic mb-2">
        {category}
      </div>
      <div className="mb-6">
        <h6 className="text-white text-xl lg:text-3xl font-bold max-w-xl mx-auto">
          {title}
        </h6>
      </div>
      <Para1 className="text-left mb-6">{description}</Para1>
      <Para1 className="text-left text-white">Read More</Para1>
    </a>
  );
};

export default BlogCard;
