import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { ProjectTypeCard } from "./ProjectCard";

export function ThreeDCardDemo({ post }: { post: ProjectTypeCard }) {
  const { author, title, _id, description, image } = post;

  return (
    <CardContainer className="inter-var h-[22rem]">
      <CardBody
        className="relative group/card
                   bg-white/90 backdrop-blur-md
                   border border-gray-400 dark:border-gray-600
                   shadow-lg hover:shadow-2xl transition-shadow
                   w-auto sm:w-[25rem] h-[31rem]
                   rounded-2xl p-6
                   flex flex-col justify-between"
      >
        {/* Top Section */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <CardItem
            translateZ="50"
            className="text-xl font-semibold text-gray-800 dark:text-white"
          >
            {title}
          </CardItem>

          {/* Fixed-height Description */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-gray-600 text-sm max-w-sm mt-2
                       dark:text-gray-300 line-clamp-2 h-10 overflow-hidden"
          >
            {description}
          </CardItem>

          {/* Image Container */}
          <CardItem
            translateZ="100"
            className="w-full mt-4 p-1 rounded-xl
                       bg-gray-100/30 dark:bg-gray-800/30
                       border border-gray-300 dark:border-gray-600
                       transition-colors"
          >
            <Link href={`/project/${_id}`}>
              <Image
                src={image || "https://placehold.co/1000x1000"}
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-lg shadow-sm
                           group-hover/card:shadow-lg transition-shadow"
                alt="thumbnail"
              />
            </Link>
          </CardItem>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4 gap-2">
          {/* Username */}
          <CardItem
            translateZ={20}
            as={Link}
            href={`/user/${post.author?._id}`}
            target="__blank"
            className="flex-1 px-4 py-2 rounded-xl
                       text-xs font-medium
                       text-gray-700 dark:text-white
                       bg-white/50 dark:bg-gray-700
                       hover:bg-white/60 dark:hover:bg-gray-600
                       transition-colors text-center"
          >
            {author?.name} <br />@{author?.username}
          </CardItem>

          {/* Details Button */}
          <CardItem
            translateZ={20}
            as="button"
            className="flex-1 px-4 py-2 rounded-xl
                       bg-gray-900 dark:bg-white
                       text-white dark:text-black
                       text-xs font-semibold
                       hover:bg-gray-800 dark:hover:bg-gray-200
                       transition-colors text-center"
          >
            <Link href={`/project/${_id}`}>Details</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
