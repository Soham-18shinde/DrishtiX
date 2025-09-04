import { Boxes } from '@/components/ui/background-boxes'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { PLAYLIST_BY_SLUG_QUERY, PROJECT_BY_ID_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import markdownit from "markdown-it";
import { formatDate } from '@/lib/utils'
import Views from '@/components/Views'
import { ProjectTypeCard } from '@/components/ProjectCard'
import { ThreeDCardDemo } from '@/components/ThreeDCard'

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPost }] = await Promise.all([
    client.fetch(PROJECT_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.details || "");

  return (
    <>
      {/* Header Hero Section */}
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <p className="tag relative">{formatDate(post._createdAt)}</p>
        <h1 className="heading relative">{post.title}</h1>
        <p className="sub-heading !max-w-5xl relative line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Content Section */}
      <section className="section_container">
        {/* Big Card Wrapper */}
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 shadow-lg max-w-4xl mx-auto space-y-6">
          
          {/* Image Thumbnail */}
          <div className="w-full h-auto rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img
              src={post.image}
              alt="Project Thumbnail"
              className="max-h-full max-w-full object-cover"
            />
          </div>

          {/* Author + Category */}
          <div className="flex-between gap-5">
            <Link href="/" className="flex gap-3 items-center">
              <Image
                src={post.author.image}
                alt="avatar"
                width={56}
                height={56}
                className="drop-shadow-md rounded-full"
              />

              <div>
                <p className="text-20-medium text-neutral-900 dark:text-white">
                  {post.author.name}
                </p>
                <p className="text-16-medium text-neutral-600 dark:text-neutral-400">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            {/* Category */}
            <p className="category-tag">{post.category}</p>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-30-bold">PROJECT DETAILS</h3>
            {parsedContent ? (
              <article
                className="prose max-w-4xl font-work-sans break-all"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">NO DETAILS PROVIDED</p>
            )}
          </div>
        </div>

        <hr className="divider mt-10" />

        {/* Editor's Pick Section */}
        {editorPost?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor's Pick</p>
            <ul className="mt-7 card_grid-sm">
              {editorPost.map((post: ProjectTypeCard) => (
                <ThreeDCardDemo key={post._id} post={post} />
              ))}
            </ul>
          </div>
        )}

        {/* Views Counter */}
        <Suspense fallback={<></>}>
          <Views id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
