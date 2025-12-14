'use client';

import { useState } from 'react';

interface ReleaseProcessProps {
  diagram?: string;
  description?: string;
}

export default function ReleaseProcess({ diagram, description }: ReleaseProcessProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no content, don't render the section
  if (!diagram && !description) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Release Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            How We Ship Quality Code
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our rigorous release process ensures every deployment meets the highest standards for quality, security, and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Static Diagram */}
          {diagram && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Release Workflow Diagram</h3>
              </div>
              <div 
                className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 h-[500px] flex items-center justify-center cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={diagram}
                  alt="Release Process Workflow"
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                />
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Visual representation of our end-to-end release pipeline
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="ml-2 text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  View Full Size
                </button>
              </p>
            </div>
          )}

          {/* Description/Documentation */}
          {description && (
            <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-3xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Process Documentation</h3>
              </div>
              
              <div className="overflow-auto h-[500px] pr-2">
                <div 
                  className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-h3:text-2xl prose-h3:text-green-900 prose-h3:mb-4 prose-h4:text-xl prose-h4:text-green-800 prose-h4:mb-3 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4 prose-li:text-slate-700 prose-li:mb-2 prose-li:leading-relaxed prose-code:text-green-700 prose-code:bg-green-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-blockquote:border-green-500 prose-blockquote:bg-green-50 prose-blockquote:italic prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Key Principles - Full Width Below */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Principles
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border border-green-200 shadow-sm">
              <div className="text-2xl mb-2">🚀</div>
              <h5 className="font-bold text-slate-900 mb-1">Automation First</h5>
              <p className="text-sm text-slate-600">Automated testing and deployment reduce errors</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-200 shadow-sm">
              <div className="text-2xl mb-2">🔒</div>
              <h5 className="font-bold text-slate-900 mb-1">Security Built-In</h5>
              <p className="text-sm text-slate-600">Security scanning at every stage of the pipeline</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-200 shadow-sm">
              <div className="text-2xl mb-2">📊</div>
              <h5 className="font-bold text-slate-900 mb-1">Continuous Monitoring</h5>
              <p className="text-sm text-slate-600">Real-time metrics and alerts ensure stability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Image Modal */}
      {isModalOpen && diagram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full max-h-screen">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg px-4 py-2"
            >
              <span className="text-sm font-medium">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Full size image */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <img
                src={diagram}
                alt="Release Process Workflow - Full Size"
                className="w-full h-auto object-contain max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {/* Info text */}
            <p className="text-white text-center mt-4 text-sm">
              Click anywhere outside the image to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

