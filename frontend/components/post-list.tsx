// ./frontend/src/app/[lang]/components/PostList.tsx

import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../lib/utils";
import { Article } from "../types/article";

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const imageUrl = getStrapiMedia(article.cover?.url);

          const category = article.category;
          const authorsBio = article.author;

          const avatarUrl = getStrapiMedia(authorsBio?.avatar.url);

          return (
            <Link
              href={`${category?.slug}/${article.slug}`}
              key={article.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
                {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                  />
                )}

                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {article.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(article.publishedAt)}
                  </span>
                  {authorsBio && (
                    <span className="text-xs dark:text-gray-400">
                      {authorsBio.name}
                    </span>
                  )}
                </div>
                <p className="py-4">{article.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
