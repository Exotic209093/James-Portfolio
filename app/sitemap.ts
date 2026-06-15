import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/lib/projects'
import { certifications } from '@/lib/certifications'
import { getBlogPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes = ['', '/about', '/projects', '/certifications', '/blog', '/contact'].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  )

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.id}`,
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const certificationRoutes = certifications.map((certification) => ({
    url: `${base}/certifications/${certification.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  const blogRoutes = getBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...certificationRoutes, ...blogRoutes]
}
