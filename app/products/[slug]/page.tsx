import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getAllProductSlugs } from "@/lib/contentstack";
import { getYouTubeEmbedUrl, isYouTubeUrl, isContentstackAcademyUrl } from "@/lib/youtube";
import LivePreviewProduct from "./LivePreviewProduct";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Enable ISR - pages regenerate in the background after this time period
export const revalidate = 20; // Revalidate every 20 seconds

// Generate static pages at build time for all products
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const search = await searchParams;
  
  // Check if we're in Live Preview mode
  const isLivePreview = search.live_preview !== undefined;
  
  if (isLivePreview) {
    console.log('🔴 Live Preview mode active for product:', slug);
  }
  
  // Fetch product data from Contentstack (will use preview token if configured)
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Wrap content with Live Preview for real-time updates
  return (
    <LivePreviewProduct>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Product Info */}
      <section className="relative bg-slate-900 text-white pt-12 pb-14 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 mb-3">
                <span className="text-white/90 text-xs font-medium">{product.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black mb-3">
                {product.title}
              </h1>

              <p className="text-base text-slate-300 mb-5 leading-relaxed">
                {product.fullDescription}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-lg font-bold text-sm hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  All Products
                </Link>
              </div>
            </div>

            {/* Large product icon */}
            <div className="flex items-center justify-center">
              <div 
                className="w-36 h-36 rounded-[2.5rem] flex items-center justify-center relative"
                style={{ backgroundColor: `${product.color}15` }}
              >
                <div 
                  className="w-20 h-20 rounded-[1.2rem] animate-pulse-slow"
                  style={{ backgroundColor: product.color }}
                />
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Overview Video */}
            {product.videoUrl && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    {isYouTubeUrl(product.videoUrl) ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">
                      {isContentstackAcademyUrl(product.videoUrl) ? 'Academy Content' : 'Product Overview'}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {isContentstackAcademyUrl(product.videoUrl) ? 'Learn from Contentstack Academy' : 'Watch this video to learn more'}
                    </p>
                  </div>
                </div>

                {isYouTubeUrl(product.videoUrl) ? (
                  // YouTube Video Embed
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={getYouTubeEmbedUrl(product.videoUrl)}
                      title={`${product.title} Overview`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // Academy or External Content - Interactive Card
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-500"></div>
                    
                    {/* Animated overlay pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
                    </div>

                    {/* Content */}
                    <div className="relative aspect-video flex flex-col items-center justify-center p-12 min-h-[400px]">
                      {/* Play button with animation */}
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                            <svg className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="text-center space-y-4">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                          {isContentstackAcademyUrl(product.videoUrl) ? '📚 Academy Course' : '🎬 View Content'}
                        </h3>
                        <p className="text-xl text-white/90 max-w-md mx-auto">
                          {isContentstackAcademyUrl(product.videoUrl) 
                            ? 'Interactive learning content from Contentstack Academy'
                            : 'Click to explore this content in detail'
                          }
                        </p>
                        <div className="pt-4">
                          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-white font-semibold group-hover:bg-white/30 transition-all">
                            <span>Open Content</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom badges */}
                      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>Tutorial</span>
                        </div>
                        {isContentstackAcademyUrl(product.videoUrl) && (
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Interactive</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                  </a>
                )}

                <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{isContentstackAcademyUrl(product.videoUrl) ? 'Academy Content' : 'Product Demo'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Tutorial</span>
                    </div>
                  </div>
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-semibold flex items-center gap-2 group ${
                      isYouTubeUrl(product.videoUrl) ? 'text-red-400 hover:text-red-300' : 'text-purple-400 hover:text-purple-300'
                    }`}
                  >
                    {isYouTubeUrl(product.videoUrl) ? 'Watch on YouTube' : isContentstackAcademyUrl(product.videoUrl) ? 'Open in Academy' : 'View Content'}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900">Technology Stack</h2>
              </div>

              <div className="space-y-6">
                {product.techStack.map((stack, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">
                      {stack.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                          style={{ backgroundColor: product.color }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Repositories */}
            {product.repositories && product.repositories.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Code Repositories</h2>
                </div>

                <div className="grid gap-4">
                  {product.repositories.map((repo, index) => (
                    <a
                      key={index}
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                              {repo.repoName}
                            </h3>
                            {repo.repoDescription && (
                              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                                {repo.repoDescription}
                              </p>
                            )}
                            <p className="text-xs text-slate-400 font-mono truncate">
                              {repo.repoUrl}
                            </p>
                          </div>
                          <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Local Dev Setup */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900">Local Development Setup</h2>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
                <pre className="text-slate-100 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {product.localDevSetup}
                </pre>
              </div>
            </div>

            {/* CI/CD Process with Diagram */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900">CI/CD Pipeline</h2>
              </div>
              
              <p className="text-slate-600 mb-6 leading-relaxed">{product.cicdProcess}</p>

              {/* CI/CD Diagram */}
              {product.cicdDiagramImage && (
                <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-slate-200 mb-4">
                  <img
                    src={product.cicdDiagramImage}
                    alt="CI/CD Pipeline Diagram"
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {product.cicdDiagramUrl && (
                <a
                  href={product.cicdDiagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Interactive Diagram on Whimsical
                </a>
              )}
            </div>

            {/* Git Strategy */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Git Branching Strategy</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{product.gitBranchingStrategy}</p>
            </div>

            {/* Observability Dashboards */}
            {product.observabilityDashboards && product.observabilityDashboards.length > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Observability Dashboards</h2>
                </div>

                <p className="text-slate-700 mb-6">
                  Monitor system health, performance metrics, and operational insights in real-time.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {product.observabilityDashboards.map((dashboard, index) => (
                    <a
                      key={index}
                      href={dashboard.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all border border-orange-200 hover:border-orange-400"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          dashboard.type === 'grafana' ? 'bg-orange-100' :
                          dashboard.type === 'datadog' ? 'bg-purple-100' :
                          dashboard.type === 'newrelic' ? 'bg-blue-100' :
                          'bg-slate-100'
                        }`}>
                          <svg className={`w-5 h-5 ${
                            dashboard.type === 'grafana' ? 'text-orange-600' :
                            dashboard.type === 'datadog' ? 'text-purple-600' :
                            dashboard.type === 'newrelic' ? 'text-blue-600' :
                            'text-slate-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                            {dashboard.name}
                          </h4>
                          <p className="text-sm text-slate-600 mb-2">{dashboard.description}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full font-medium capitalize">
                              {dashboard.type}
                            </span>
                            <span className="text-orange-600 font-semibold group-hover:gap-2 flex items-center">
                              Open Dashboard
                              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* QA & Testing */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900">QA & Testing</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Test Strategies
                </h3>
                <ul className="space-y-2">
                  {product.testStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Testing Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.testingTools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white text-green-700 rounded-xl text-sm font-semibold border border-green-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Practices & Guidelines */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-slate-900">Team Practices & Guidelines</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">
                    Practices
                  </h3>
                  <ul className="space-y-2">
                    {product.teamPractices.map((practice, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-500 flex-shrink-0 mt-1">▸</span>
                        <span className="text-slate-700">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">
                    Guidelines
                  </h3>
                  <ul className="space-y-2">
                    {product.guidelines.map((guideline, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-purple-500 flex-shrink-0 mt-1">▸</span>
                        <span className="text-slate-700">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            {product.academyUrl && (
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-6 shadow-lg text-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Academy Course</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Learn more about {product.title} with our comprehensive Academy content.
                </p>
                <a
                  href={product.academyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white text-center px-4 py-3 rounded-xl font-semibold transition-all"
                >
                  📚 View Academy Course
                </a>
              </div>
            )}

            {/* Team Members */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Team</h3>
              </div>

              <div className="space-y-4">
                {product.teamMembers.map((member, index) => (
                  <div key={index} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    {member.avatar ? (
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200 group-hover:border-slate-300 transition-colors"
                        />
                        <div 
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                          style={{ backgroundColor: product.color }}
                        >
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: product.color }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-slate-700 transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-600 mb-1">{member.role}</p>
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-xs hover:underline block truncate inline-flex items-center gap-1 group/email"
                        style={{ color: product.color }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="group-hover/email:underline">{member.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sprint Process */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">
                  Sprint Process
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{product.sprintProcess}</p>
              </div>

              {/* Dependencies */}
              {product.dependencies.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">
                    Dependencies
                  </h4>
                  <div className="space-y-3">
                    {product.dependencies.map((dep, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-xl">
                        <p className="font-semibold text-slate-900 text-sm mb-1">{dep.team}</p>
                        <p className="text-xs text-slate-600 mb-2">{dep.description}</p>
                        {dep.slackChannel && (
                          <p className="text-xs text-slate-500 font-mono">{dep.slackChannel}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful External Links */}
              {product.helpfulLinks && product.helpfulLinks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Helpful External Links
                  </h4>
                  <div className="space-y-2">
                    {product.helpfulLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm mb-0.5 group-hover:text-purple-600 transition-colors">
                            {link.title}
                          </p>
                          {link.description && (
                            <p className="text-xs text-slate-600 leading-relaxed">{link.description}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-1 truncate">{link.url}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </div>
    </LivePreviewProduct>
  );
}
