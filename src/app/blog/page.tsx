import BlogIndex from "@/components/blog/blog-index";
import { getRootPosts } from "@/lib/blog";
import { paginate } from "@/lib/pagination";
import type { Metadata } from "next";

const PAGE_SIZE = 5;

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, guides, and study materials by Zhengyang Xie.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog | Zhengyang Xie",
    description: "Notes, guides, and study materials by Zhengyang Xie.",
    url: "/blog/",
    type: "website",
    images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Zhengyang Xie",
    description: "Notes, guides, and study materials by Zhengyang Xie.",
    images: ["/og/blog.png"],
  },
};

export default function BlogPage() {
  const posts = getRootPosts();
  const { items, pagination } = paginate(posts, { page: 1, pageSize: PAGE_SIZE });

  return (
    <BlogIndex
      posts={items}
      page={pagination.page}
      totalPages={pagination.totalPages}
    />
  );
}
