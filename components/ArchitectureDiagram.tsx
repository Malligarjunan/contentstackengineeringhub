import { ArchitectureDiagram as ArchitectureDiagramType } from "@/types/product";

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagramType;
}

export default function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6C5CE7] transition-colors">
        {diagram.title}
      </h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {diagram.description}
      </p>
      
      {/* Enhanced placeholder for diagram image */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-200 group-hover:border-[#6C5CE7] transition-colors overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#6C5CE7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
          <div className="mb-4 relative">
            <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg 
                className="h-10 w-10 text-[#6C5CE7]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
                />
              </svg>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-200 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Architecture Diagram
          </p>
          <p className="text-xs text-gray-500 font-mono px-6">
            {diagram.imageUrl}
          </p>
        </div>
      </div>

      {diagram.details && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#6C5CE7] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-700 leading-relaxed flex-1">
              {diagram.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
