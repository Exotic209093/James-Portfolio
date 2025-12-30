import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const processedContent = await remark().use(remarkHtml).process(post.content)
  const contentHtml = processedContent.toString()

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
            {post.author && (
              <span>By {post.author}</span>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 text-sm bg-purple-900/30 text-purple-300 rounded-lg border border-purple-800/50"
                >
                  <Tag className="h-3 w-3 mr-2" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Content */}
        <article
          className="prose prose-invert prose-purple max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
            prose-strong:text-white
            prose-code:text-purple-400 prose-code:bg-purple-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-black prose-pre:border prose-pre:border-purple-800/30
            prose-blockquote:border-purple-600 prose-blockquote:text-gray-300
            prose-li:text-gray-300"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  )
}
