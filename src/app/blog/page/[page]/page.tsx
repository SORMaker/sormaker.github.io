import BlogIndex from "@/components/blog/blog-index";
import { getRootPosts } from "@/lib/blog";
import { paginate } from "@/lib/pagination";
import type { Metadata } from "next";

const PAGE_SIZE = 5;

export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = Math.ceil(getRootPosts().length / PAGE_SIZE);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog · Page ${page}`,
    alternates: { canonical: `/blog/page/${page}/` },
    openGraph: {
      title: `Blog · Page ${page} | Zhengyang Xie`,
      description: "Notes, guides, and study materials by Zhengyang Xie.",
      url: `/blog/page/${page}/`,
      type: "website",
      images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog · Page ${page} | Zhengyang Xie`,
      images: ["/og/blog.png"],
    },
  };
}

export default async function BlogPageNumber({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  const posts = getRootPosts();
  const { items, pagination } = paginate(posts, { page, pageSize: PAGE_SIZE });

  return (
    <BlogIndex
      posts={items}
      page={pagination.page}
      totalPages={pagination.totalPages}
    />
  );
}
