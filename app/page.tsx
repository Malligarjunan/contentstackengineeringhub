import Link from "next/link";
import { getHomepageContent, getAllProducts } from "@/lib/contentstack";
import { ArchitectureDiagram } from "@/types/product";
import { getIcon, getColorClasses, getResourceIconBg } from "@/lib/homepage-helpers";
import ReleaseProcess from "@/components/ReleaseProcess";

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch homepage content and products from Contentstack
  let homepageContent;
  let products;

  try {
    [homepageContent, products] = await Promise.all([
      getHomepageContent(),
      getAllProducts()
    ]);
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    // Fallback is handled by the contentstack service
    const { homepageContent: localHomepage } = await import("@/data/homepage");
    const { products: localProducts } = await import("@/data/products");
    homepageContent = localHomepage;
    products = localProducts;
  }

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Internal Knowledge Hub */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {homepageContent.heroBadgeText && (
            <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white/90 text-sm font-semibold">{homepageContent.heroBadgeText}</span>
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {homepageContent.heroTitle || 'Contentstack Engineering Knowledge Hub'}
          </h1>

          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {homepageContent.heroDescription || 'Your central resource for all technical documentation, architecture, and development practices across Contentstack products.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/products"
              className="group relative px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-base overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Browse All Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white font-bold">
                Browse All Products →
              </span>
            </Link>
          </div>

          {/* Quick stats about the hub */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span><strong className="text-white">{products.length}</strong> Products</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <span><strong className="text-white">{categories.length}</strong> Categories</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span>Complete Documentation</span>
            </div>
          </div>
        </div>
      </section>

    

      {/* What You'll Find Here Section - From Contentstack */}
      {homepageContent.featureCards && homepageContent.featureCards.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {homepageContent.featuresSectionTitle || 'Everything You Need to Know'}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {homepageContent.featuresSectionDescription || 'Comprehensive information about every Contentstack product, team, and process — all in one place'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageContent.featureCards.map((item: any, i: number) => {
              const colorClasses = getColorClasses(item.color || 'purple');
              return (
                <div
                  key={i}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${colorClasses.borderColor} group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colorClasses.bgColor} flex items-center justify-center mb-4 ${colorClasses.textColor} group-hover:scale-110 transition-transform`}>
                    {getIcon(item.iconName || item.icon_name)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Our Products Section - By Category */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-slate-50">
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="text-sm font-semibold text-[#6C5CE7] uppercase tracking-wider bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
              {homepageContent.productsSectionBadge || 'Product Catalog'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {homepageContent.productsSectionTitle || 'Browse Products by Category'}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {homepageContent.productsSectionDescription || 'Access detailed information about each product including teams, tech stack, processes, and guidelines'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => {
            const categoryProducts = products.filter(p => p.category === category);
            const categoryColors = [
              'from-purple-500 to-pink-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500',
            ];
            const colorClass = categoryColors[i % categoryColors.length];

            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 text-white font-bold text-xl shadow-lg`}>
                    {categoryProducts.length}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {category}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} with complete documentation
                  </p>
                  
                  <div className="flex items-center text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>View products</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all hover:scale-105 shadow-lg"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

        {/* Release Process Section */}
        {homepageContent.releaseProcess && (
        <ReleaseProcess 
          diagram={homepageContent.releaseProcess.diagram}
          description={homepageContent.releaseProcess.description}
        />
      )}

      {/* Platform Overview & About Contentstack - Side by Side */}
      {(homepageContent.platformVideoUrl || homepageContent.aboutContentstack) && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block">
              <span className="text-sm font-semibold text-[#6C5CE7] uppercase tracking-wider bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
                Platform Overview
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Understanding Contentstack
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Learn about our platform through video and comprehensive documentation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Platform Overview Video */}
            {homepageContent.platformVideoUrl && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Platform Video</h3>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-900">
                  <div className="relative bg-black overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={homepageContent.platformVideoUrl.replace('watch?v=', 'embed/')}
                      title="Contentstack Platform Overview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  Watch this video to understand the Contentstack platform
                </p>
              </div>
            )}

            {/* About Contentstack */}
            {homepageContent.aboutContentstack && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-purple-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">What is Contentstack?</h3>
                </div>
                <div className="prose prose-lg max-w-none overflow-auto h-[400px] pr-2">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {homepageContent.aboutContentstack}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Architecture Section - From Contentstack */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-300 text-sm font-semibold">
                {homepageContent.architectureSectionBadge || 'Platform Architecture'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              {homepageContent.architectureSectionTitle || 'Built for Scale.'}
              <br />
              <span className="text-purple-400">
                {homepageContent.architectureSectionSubtitle || 'Designed for Speed.'}
              </span>
            </h2>
            
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {homepageContent.architectureSectionDescription || 'Explore our microservices architecture, cloud-native infrastructure, and the technical decisions that power millions of digital experiences worldwide.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Architecture Principles - From Contentstack */}
            {homepageContent.architecturePrinciples && homepageContent.architecturePrinciples.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {homepageContent.architecturePrinciplesTitle || 'Core Architecture Principles'}
                </h3>
                <ul className="space-y-4">
                  {homepageContent.architecturePrinciples.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Architecture Diagram - From Contentstack */}
            {homepageContent.mainArchitectureImageUrl && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">System Overview</h3>
                <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={homepageContent.mainArchitectureImageUrl}
                    alt={homepageContent.architectureImageTitle || 'Architecture Diagram'}
                    className="w-full h-auto"
                  />
                  
                  {/* Overlay gradient on hover */}
                  {(homepageContent.architectureImageTitle || homepageContent.architectureImageDescription) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          {homepageContent.architectureImageTitle || 'Architecture Diagram'}
                        </h4>
                        <p className="text-slate-200 text-sm">
                          {homepageContent.architectureImageDescription || ''}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {homepageContent.architectureImageDescription && (
                  <div className="mt-4">
                    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                      <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {homepageContent.architectureImageDescription}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Architecture Components Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homepageContent.architectureDiagrams.slice(0, 4).map((diagram: ArchitectureDiagram, i: number) => (
              <a
                key={i}
                href={diagram.whimsicalUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-purple-400/50 transition-all group cursor-pointer block"
              >
                {/* Diagram Image or Icon */}
                {diagram.imageUrl ? (
                  <div className="aspect-video bg-white/10 overflow-hidden relative">
                    <img
                      src={diagram.imageUrl}
                      alt={diagram.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <div className="aspect-video bg-white/5 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h4 className="font-bold text-white mb-2 text-sm group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    <span className="flex-1">{diagram.title}</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-2">{diagram.description}</p>
                  <div className="flex items-center gap-1 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-semibold">View Details</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Explore Product Architecture
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Quick Access Resources - From Contentstack */}
      {homepageContent.quickAccessResources && homepageContent.quickAccessResources.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {homepageContent.resourcesSectionTitle || 'Quick Access Resources'}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {homepageContent.resourcesSectionDescription || 'Frequently accessed documentation, tools, and resources for daily work'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageContent.quickAccessResources.map((resource: any, i: number) => {
              const colorClasses = getColorClasses(resource.color || 'purple');
              const iconBg = getResourceIconBg(resource.color || 'purple');
              return (
                <a
                  key={i}
                  href={resource.linkUrl || resource.link_url}
                  className={`relative bg-gradient-to-br ${colorClasses.bgGradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${colorClasses.borderColor} group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    {getIcon(resource.iconName || resource.icon_name)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{resource.title}</h3>
                  <p className="text-slate-600 text-sm">{resource.description}</p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Section - From Contentstack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {homepageContent.ctaSectionBadge && (
            <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/90 text-sm font-semibold">{homepageContent.ctaSectionBadge}</span>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {homepageContent.ctaSectionTitle || 'Have Questions or Suggestions?'}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {homepageContent.ctaSectionDescription || 'This knowledge hub is maintained by the engineering team. If you notice outdated information or want to contribute, reach out to your team lead or submit a pull request.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-base hover:scale-105 transition-all hover:shadow-2xl inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Products
            </Link>
            <a
              href="https://www.contentstack.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-xl font-bold text-base hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Official Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
