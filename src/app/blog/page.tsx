import Link from 'next/link';
import { notFound } from 'next/navigation';

import { db } from '@/lib/db';

export default async function BlogPage() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (!posts) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Link
        href="blog/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Create New Post
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="container mx-auto px-4 py-8">
            <article className="prose lg:prose-xl">
              <h1>{post.title}</h1>
              <p>
                By {post.author} |{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
