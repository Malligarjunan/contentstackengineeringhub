import Link from "next/link";
import { getHomepageContent, getAllProducts } from "@/lib/contentstack";
import { ArchitectureDiagram } from "@/types/product";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

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
          <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white/90 text-sm font-semibold">Internal Engineering Resource</span>
          </div>

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

      {/* About Contentstack Section */}
      {homepageContent.aboutContentstack && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block">
                <span className="text-sm font-semibold text-[#6C5CE7] uppercase tracking-wider bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
                  About Contentstack
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                What is Contentstack?
              </h2>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-100 shadow-lg">
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {homepageContent.aboutContentstack}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What You'll Find Here Section - NEW */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive information about every Contentstack product, team, and process — all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Team Information",
              description: "Team members, roles, contacts, and organizational structure for every product team",
              borderColor: "border-purple-100",
              bgColor: "bg-purple-100",
              textColor: "text-purple-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "Engineering Processes",
              description: "CI/CD pipelines, sprint processes, git workflows, and deployment procedures",
              borderColor: "border-blue-100",
              bgColor: "bg-blue-100",
              textColor: "text-blue-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              ),
              title: "Technical Documentation",
              description: "Architecture diagrams, tech stack details, API references, and local dev setup",
              borderColor: "border-green-100",
              bgColor: "bg-green-100",
              textColor: "text-green-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
              title: "QA & Testing Strategies",
              description: "Test strategies, automation frameworks, quality guidelines, and testing tools",
              borderColor: "border-pink-100",
              bgColor: "bg-pink-100",
              textColor: "text-pink-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Best Practices & Guidelines",
              description: "Team practices, coding standards, documentation guidelines, and conventions",
              borderColor: "border-orange-100",
              bgColor: "bg-orange-100",
              textColor: "text-orange-600"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              ),
              title: "Team Dependencies",
              description: "Cross-team dependencies, contact points for DevOps, Platform, and other teams",
              borderColor: "border-cyan-100",
              bgColor: "bg-cyan-100",
              textColor: "text-cyan-600"
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${item.borderColor} group`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 ${item.textColor} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Products Section - By Category */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-slate-50">
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="text-sm font-semibold text-[#6C5CE7] uppercase tracking-wider bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
              Product Catalog
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Browse Products by Category
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Access detailed information about each product including teams, tech stack, processes, and guidelines
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

      {/* Platform Overview Video Section */}
      {homepageContent.platformVideoUrl && (
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
              New to the team? Watch this video to understand the Contentstack platform and architecture
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 p-2">
              <div className="relative bg-black rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
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
          </div>
        </section>
      )}

      {/* Architecture Section - Enhanced with Diagram */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-300 text-sm font-semibold">Platform Architecture</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Built for Scale.
              <br />
              <span className="text-purple-400">Designed for Speed.</span>
            </h2>
            
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our microservices architecture, cloud-native infrastructure, and the technical decisions that power millions of digital experiences worldwide.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            {/* Key Features */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Core Architecture Principles</h3>
              <ul className="space-y-4">
                {[
                  { title: 'Microservices Architecture', desc: 'Independent, scalable services for each product' },
                  { title: 'Global CDN Distribution', desc: 'Content delivered from edge locations worldwide' },
                  { title: 'Real-time Data Pipeline', desc: 'Instant data processing and analytics' },
                  { title: 'Edge Computing Layer', desc: 'Processing at the edge for minimal latency' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Architecture Diagram */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">System Overview</h3>
              <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.contentstack.io/v3/assets/blt23180bf2502c7444/bltb686bd66a92b4622/6387093e12a129103e952064/Contentstack-powered_Website_-_Layered_Architecture.jpg"
                  alt="Contentstack Layered Architecture"
                  className="w-full h-auto"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Contentstack Layered Architecture</h4>
                    <p className="text-slate-200 text-sm">
                      Multi-tier architecture delivering content at scale globally
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This diagram shows the complete Contentstack platform stack including presentation layer, 
                    edge delivery, CMS core, and infrastructure components.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Components Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homepageContent.architectureDiagrams.slice(0, 4).map((diagram: ArchitectureDiagram, i: number) => (
              <a
                key={i}
                href={diagram.whimsicalUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-400/50 transition-all group cursor-pointer block"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
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
                  <span className="font-semibold">View on Whimsical</span>
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

    
      {/* Quick Access Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Quick Access Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Frequently accessed documentation, tools, and resources for daily work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
              title: "API Docs",
              description: "Complete API reference",
              link: "https://www.contentstack.com/docs",
              bgGradient: "from-purple-50 to-purple-100",
              borderColor: "border-purple-200",
              iconBg: "bg-purple-500"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ),
              title: "Architecture",
              description: "System diagrams",
              link: "#architecture",
              bgGradient: "from-blue-50 to-blue-100",
              borderColor: "border-blue-200",
              iconBg: "bg-blue-500"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
              title: "Best Practices",
              description: "Team guidelines",
              link: "/products",
              bgGradient: "from-green-50 to-green-100",
              borderColor: "border-green-200",
              iconBg: "bg-green-500"
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              title: "Team Contacts",
              description: "Who to reach out",
              link: "/products",
              bgGradient: "from-orange-50 to-orange-100",
              borderColor: "border-orange-200",
              iconBg: "bg-orange-500"
            }
          ].map((resource, i) => (
            <a
              key={i}
              href={resource.link}
              className={`relative bg-gradient-to-br ${resource.bgGradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 ${resource.borderColor} group`}
            >
              <div className={`w-12 h-12 rounded-xl ${resource.iconBg} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                {resource.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{resource.title}</h3>
              <p className="text-slate-600 text-sm">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section - Knowledge Hub Focus */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white/90 text-sm font-semibold">For Contentstack Team Members</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Have Questions or Suggestions?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            This knowledge hub is maintained by the engineering team. If you notice outdated information or want to contribute, reach out to your team lead or submit a pull request.
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
