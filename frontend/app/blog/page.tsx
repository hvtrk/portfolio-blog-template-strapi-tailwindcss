"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../../lib/api";
import PageLoader from "@/components/ui/loader";
import PostList from "@/components/post-list";
import { Article } from "@/types/article";
import PageHeader from "@/components/post-header";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}
export default function Blog() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          author: {
            populate: "*",
          },
          blocks: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      // const responseData = await fetchAPI(path, options);
      if (start === 0) {
        setData(responseData.data as Article[]);
      } else {
        setData((prevData: Article[]) => [
          ...prevData,
          ...(responseData.data as Article[]),
        ]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <PageLoader size="lg" variant="dots" />;

  return (
    <div>
      <PageHeader heading="Blogs" text="Something Cool" />
      <PostList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMorePosts}
            >
              Load more posts...
            </button>
          </div>
        )}
      </PostList>
    </div>
  );
}
