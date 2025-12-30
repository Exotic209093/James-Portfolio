import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import { getBlogPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Card from '@/components/ui/Card'

export default function BlogPage() {
  const posts = getBlogPosts()

  if (posts.length === 0) {
    return (
      <div className="pt-20 md:pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Coming soon! Check back later for articles and tutorials.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card hover className="group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
