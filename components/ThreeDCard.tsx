"use client";

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
          bg-gray-200 dark:bg-neutral-900 
          border border-gray-400 dark:border-white/20 
          shadow-lg hover:shadow-xl transition-shadow
          w-auto sm:w-[25rem] h-[31rem] rounded-xl p-6 
          flex flex-col justify-between"
      >
        {/* Top Section */}
        <div>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>

          {/* Fixed-height description */}
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 
                       line-clamp-2 h-10 overflow-hidden"
          >
            {description}
          </CardItem>

          {/* Image */}
          <CardItem translateZ="100" className="w-full mt-4">
            <Link href={`/project/${_id}`}>
              <Image
                src={image || "https://placehold.co/1000x1000"}
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </Link>
          </CardItem>
        </div>

        {/* Bottom Section (stays aligned at bottom) */}
        <div className="flex items-center justify-between mt-4">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/user/${post.author?._id}`}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            {author?.name} <br />@{author?.username}
          </CardItem>

          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            <Link href={`/project/${_id}`}>Details</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
