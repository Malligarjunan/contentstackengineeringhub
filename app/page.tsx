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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section - Internal Knowledge Hub */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden py-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          
          {/* Enhanced animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {homepageContent.hero_badge_text && (
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5 shadow-lg hover:bg-white/15 transition-all duration-300 animate-fade-in-down">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-white/95 text-sm font-bold tracking-wide">{homepageContent.hero_badge_text}</span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight animate-fade-in-up">
            {homepageContent.hero_title || 'Contentstack Engineering Knowledge Hub'}
          </h1>

          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mx-auto mb-10 leading-relaxed font-medium animate-fade-in-up animation-delay-200">
            {homepageContent.hero_description || 'Your central resource for all technical documentation, architecture, and development practices across Contentstack products.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-400">
            <Link
              href="/products"
              className="group relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                Browse All Products
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Enhanced quick stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm animate-fade-in-up animation-delay-600">
            <div className="flex items-center gap-3 text-slate-200 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <span className="font-semibold"><strong className="text-white text-xl">{products.length}</strong> Products</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <span className="font-semibold"><strong className="text-white text-xl">{categories.length}</strong> Categories</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold">Complete Documentation</span>
            </div>
          </div>
        </div>
      </section>


      {/* Our Products Section - By Category */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 -z-10"></div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {homepageContent.products_section_title || 'Browse Products by Category'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {homepageContent.products_section_description || 'Access detailed information about each product including teams, tech stack, processes, and guidelines'}
          </p>
        </div>

        {/* All Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const categoryColors = [
              'from-purple-500 to-pink-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500',
            ];
            const categoryIndex = categories.indexOf(product.category);
            const colorClass = categoryColors[categoryIndex % categoryColors.length];

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-slate-100 hover:border-slate-200 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClass} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${colorClass} text-white`}>
                      {product.category}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h4 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </h4>

                  {/* Product Description */}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {product.shortDescription}
                  </p>
                  
                  {/* View Details Link */}
                  <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View details</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${colorClass} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-20 group-hover:h-20`}></div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Section */}
      {homepageContent.tech_stack && homepageContent.tech_stack.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                {homepageContent.tech_stack_section_title || 'Tech Stack'}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {homepageContent.tech_stack_section_description || 'The technologies and tools that power Contentstack\'s platform'}
              </p>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {homepageContent.tech_stack.map((category: any, i: number) => {
                const categoryColors = {
                  blue: {
                    gradient: 'from-blue-50 to-cyan-50',
                    border: 'border-blue-200',
                    titleBg: 'from-blue-500 to-cyan-500',
                    itemBg: 'bg-blue-50/50 hover:bg-blue-100/70 border-blue-200'
                  },
                  green: {
                    gradient: 'from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    titleBg: 'from-green-500 to-emerald-500',
                    itemBg: 'bg-green-50/50 hover:bg-green-100/70 border-green-200'
                  },
                  purple: {
                    gradient: 'from-purple-50 to-indigo-50',
                    border: 'border-purple-200',
                    titleBg: 'from-purple-500 to-indigo-500',
                    itemBg: 'bg-purple-50/50 hover:bg-purple-100/70 border-purple-200'
                  },
                  orange: {
                    gradient: 'from-orange-50 to-red-50',
                    border: 'border-orange-200',
                    titleBg: 'from-orange-500 to-red-500',
                    itemBg: 'bg-orange-50/50 hover:bg-orange-100/70 border-orange-200'
                  }
                };
                
                const colors = categoryColors[category.color as keyof typeof categoryColors] || categoryColors.blue;

                return (
                  <div
                    key={i}
                    className={`group relative bg-gradient-to-br ${colors.gradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl border-2 ${colors.border} transition-all duration-500 hover:-translate-y-1`}
                  >
                    {/* Category Header */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${colors.titleBg} text-white px-6 py-3 rounded-2xl shadow-lg mb-4`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {category.icon === 'cloud' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          )}
                          {category.icon === 'database' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          )}
                          {category.icon === 'code' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          )}
                          {category.icon === 'test' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                        </svg>
                        <h3 className="text-xl font-black uppercase tracking-wide">{category.category}</h3>
                      </div>
                      <p className="text-slate-600 text-sm font-medium">{category.description}</p>
                    </div>

                    {/* Technologies Grid */}
                    <div className="space-y-3">
                      {category.technologies.map((tech: any, techIndex: number) => (
                        <div
                          key={techIndex}
                          className={`${colors.itemBg} backdrop-blur-sm rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group/tech`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Tech Logo/Icon */}
                            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover/tech:scale-110 transition-transform p-2">
                              {tech.logo?.url || tech.logo ? (
                                <img 
                                  src={tech.logo?.url || tech.logo} 
                                  alt={`${tech.name} logo`}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <span className="text-2xl font-black text-slate-700">
                                  {tech.name.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            
                            {/* Tech Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-black text-slate-900 mb-1 group-hover/tech:text-slate-700 transition-colors">
                                {tech.name}
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Architecture Section - From Contentstack */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-indigo-50/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg hover:shadow-xl transition-shadow">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {homepageContent.architecture_section_badge || 'Platform Architecture'}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {homepageContent.architecture_section_title || 'Built for Scale.'}
              {homepageContent.architecture_section_subtitle && (
                <>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    {homepageContent.architecture_section_subtitle}
                  </span>
                </>
              )}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {homepageContent.architecture_section_description || 'Explore our microservices architecture, cloud-native infrastructure, and the technical decisions that power millions of digital experiences worldwide.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Main Architecture Diagram */}
            {homepageContent.main_architecture_image_url && (
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {homepageContent.architecture_image_title || 'System Overview'}
                  </h3>
                </div>
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50 border-2 border-indigo-100 h-[500px] flex items-center justify-center shadow-inner">
                  <img
                    src={homepageContent.main_architecture_image_url}
                    alt={homepageContent.architecture_image_title || 'Architecture Diagram'}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-500"
                  />
                  {/* Overlay hint on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {homepageContent.architecture_image_description && (
                  <p className="text-sm text-slate-600 mt-4 text-center font-medium">
                    {homepageContent.architecture_image_description}
                  </p>
                )}
              </div>
            )}

            {/* Architecture Principles */}
            {homepageContent.architecture_principles && homepageContent.architecture_principles.length > 0 && (
              <div className="group relative bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-500 overflow-hidden">
                {/* Decorative element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400 to-blue-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {homepageContent.architecture_principles_title || 'Core Principles'}
                    </h3>
                  </div>
                  <div className="space-y-4 overflow-auto h-[500px] pr-2">
                    {homepageContent.architecture_principles.map((item: any, i: number) => (
                      <div key={i} className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-slate-900 font-black text-lg mb-2">{item.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Architecture Diagrams Grid */}
          {homepageContent.architecture_diagrams && homepageContent.architecture_diagrams.length > 0 && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                  Explore Architecture Diagrams
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Dive deep into our system architecture with detailed diagrams and documentation
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {homepageContent.architecture_diagrams.slice(0, 4).map((diagram: ArchitectureDiagram, i: number) => (
                  <a
                    key={i}
                    href={diagram.whimsicalUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-indigo-100 hover:border-indigo-300 cursor-pointer block"
                  >
                    {/* Diagram Image or Icon */}
                    {diagram.imageUrl ? (
                      <div className="aspect-video bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden relative">
                        <img
                          src={diagram.imageUrl}
                          alt={diagram.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(99 102 241) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
                        </div>
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h4 className="font-black text-slate-900 mb-2 text-base group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                        <span className="flex-1 leading-tight">{diagram.title}</span>
                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </h4>
                      <p className="text-slate-600 text-sm line-clamp-2 mb-3 leading-relaxed">{diagram.description}</p>
                      <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View on Whimsical</span>
                      </div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-indigo-500 to-blue-600 opacity-0 group-hover:opacity-10 rounded-tl-full transition-all duration-500"></div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>    
    {/* Release Process Section */}
    {homepageContent.release_process && (
        <ReleaseProcess 
          diagram={homepageContent.release_process.diagram}
          description={homepageContent.release_process.description}
        />
      )}

 {/* Quick Access Resources - From Contentstack */}
 {homepageContent.quick_access_resources && homepageContent.quick_access_resources.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {homepageContent.resources_section_title || 'Quick Access Resources'}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {homepageContent.resources_section_description || 'Frequently accessed documentation, tools, and resources for daily work'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageContent.quick_access_resources.map((resource: any, i: number) => {
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
      
      {/* What You'll Find Here Section - From Contentstack */}
      {homepageContent.feature_cards && homepageContent.feature_cards.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                Platform Features
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {homepageContent.features_section_title || 'Everything You Need to Know'}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {homepageContent.features_section_description || 'Comprehensive information about every Contentstack product, team, and process — all in one place'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homepageContent.feature_cards.map((item: any, i: number) => {
              const colorClasses = getColorClasses(item.color || 'purple');
              return (
                <div
                  key={i}
                  className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 ${colorClasses.borderColor} group overflow-hidden`}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl ${colorClasses.bgColor} flex items-center justify-center mb-6 ${colorClasses.textColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      {getIcon(item.iconName || item.icon_name)}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute -bottom-1 -right-1 w-20 h-20 ${colorClasses.bgColor} opacity-10 rounded-tl-full transition-all duration-500 group-hover:w-24 group-hover:h-24`}></div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Platform Overview & About Contentstack - Side by Side */}
      {(homepageContent.platform_video_url || homepageContent.about_contentstack) && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Contentstack Intro
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Learn about our platform through video and comprehensive documentation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Platform Overview Video */}
            {homepageContent.platform_video_url && (
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-slate-100 hover:border-red-100 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Platform Video</h3>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 ring-4 ring-slate-100 group-hover:ring-red-100 transition-all duration-500">
                  <div className="relative bg-black overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={homepageContent.platform_video_url.replace('watch?v=', 'embed/')}
                      title="Contentstack Platform Overview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-6 text-center font-medium">
                  Watch this video to understand the Contentstack platform
                </p>
              </div>
            )}

            {/* About Contentstack */}
            {homepageContent.about_contentstack && (
              <div className="group relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-purple-100 hover:border-purple-200 transition-all duration-500 overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">What is Contentstack?</h3>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 overflow-auto h-[400px] shadow-inner">
                    <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">
                      {homepageContent.about_contentstack}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
     

      {/* CTA Section - From Contentstack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {homepageContent.cta_section_badge && (
            <div className="mb-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/90 text-sm font-semibold">{homepageContent.cta_section_badge}</span>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {homepageContent.cta_section_title || 'Have Questions or Suggestions?'}
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {homepageContent.cta_section_description || 'This knowledge hub is maintained by the engineering team. If you notice outdated information or want to contribute, reach out to your team lead.'}
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
          </div>
        </div>
      </section>
    </div>
  );
}
