"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { PortableText } from "@portabletext/react";

// Define the type for your blog post
interface BlogPost {
  _id: string;
  title: string;
  // Add other fields as needed
}

const myPortableTextComponents = {
  block: {
    // For regular paragraphs
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    // For h2 headers
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    // For bullet lists
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 mb-4">{children}</ul>
    ),
  },
  listItem: {
    // Bullet list items
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
  marks: {
    // For links
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

const client = createClient({
  projectId: "8s45rij1",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-03-25",
  token:
    "skj7ZSuatRx2JTVd8tnld7r9ZFKCYTcsbpdCnzx8tHhfeeTh0eQRxWAxP3RjeMF7JKw8YhcU9P0L9LR8aL3ZGWPW9R0VYTJzTtfBASaJRbJ74z5V99QV3PixAmhJRdTyipkYxj9zc7yGbZ8DCQW0uejGxydJAj7eAPX5J0umZgeVVDa78kje",
  withCredentials: true,
});

const SanityBlogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      const query = '*[_type == "blog"]';

      try {
        const fetchedPosts: BlogPost[] = await client.fetch(query);
        console.log("All blog posts:", fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to fetch blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBlogPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Sanity Blogs</h1>
      {posts.map((post: any) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      ))}
    </div>
  );
};

export default SanityBlogs;
