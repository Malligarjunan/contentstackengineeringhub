import Link from "next/link";
import { homepageContent } from "@/data/homepage";
import { products } from "@/data/products";

export default function Home() {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Modern Minimalist */}
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
          <div className="mb-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-xs font-medium">Engineering Hub • Live</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Build Better.
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Ship Faster.
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Your central hub for technical docs, architecture insights, and engineering best practices across all Contentstack products.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/products"
              className="group relative px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white font-bold">
                Explore Products →
              </span>
            </Link>
            
            <a
              href="https://www.contentstack.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all hover:scale-105"
            >
              Documentation
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Platform Overview Video Section */}
      {homepageContent.platformVideoUrl && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block">
              <span className="text-sm font-semibold text-[#6C5CE7] uppercase tracking-wider bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
                Platform Overview
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Discover Contentstack
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch this video to understand how Contentstack powers modern digital experiences
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

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-md border border-slate-200">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-slate-700">Platform Demo</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-md border border-slate-200">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold text-slate-700">Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-md border border-slate-200">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold text-slate-700">Lightning Fast</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Bento Grid Style */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: products.length + '+', label: 'Products', color: 'from-purple-500 to-pink-500', icon: '🚀' },
            { value: '99.99%', label: 'Uptime', color: 'from-green-500 to-emerald-500', icon: '⚡' },
            { value: 'Global', label: 'CDN', color: 'from-blue-500 to-cyan-500', icon: '🌍' },
            { value: '24/7', label: 'Support', color: 'from-orange-500 to-yellow-500', icon: '💬' }
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`}></div>
            </div>
          ))}
        </div>
      </section>

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
            {homepageContent.architectureDiagrams.slice(0, 4).map((diagram, i) => (
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

    
      {/* Team & Resources - Modern Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Developers */}
          <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-6">👨‍💻</div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">For Developers</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Complete technical documentation, code samples, API references, and local setup guides for every product in our stack.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold group"
              >
                Browse Docs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* For QA Teams */}
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">For QA Teams</h3>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Test strategies, quality guidelines, automation frameworks, and comprehensive QA documentation across all products.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold group"
              >
                View Testing Guides
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Modern */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEG0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Ready to dive in?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Welcome to our engineering team—together, we're shaping the future of digital experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.contentstack.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-bold text-base hover:scale-105 transition-all hover:shadow-2xl"
            >
              Get Started
            </a>
            <a
              href="https://www.contentstack.com/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/20 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
