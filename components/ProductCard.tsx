import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div 
        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 h-full border-t-4 hover:transform hover:-translate-y-2 flex flex-col relative overflow-hidden"
        style={{ borderTopColor: product.color }}
      >
        {/* Gradient overlay on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
          style={{ background: `linear-gradient(135deg, ${product.color}, transparent)` }}
        />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-gray-200 transition-colors">
              {product.category}
            </span>
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm"
              style={{ backgroundColor: `${product.color}15` }}
            >
              <div 
                className="w-6 h-6 rounded-lg"
                style={{ backgroundColor: product.color }}
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#6C5CE7] transition-colors">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {product.shortDescription}
          </p>

          {/* Tech Stack Preview */}
          {product.techStack.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {product.techStack[0].technologies.slice(0, 3).map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md font-medium border border-gray-200 group-hover:border-gray-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                {product.techStack[0].technologies.length > 3 && (
                  <span 
                    className="text-xs px-2.5 py-1 rounded-md font-medium text-white"
                    style={{ backgroundColor: product.color }}
                  >
                    +{product.techStack[0].technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <span 
              className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
              style={{ color: product.color }}
            >
              Learn more
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {product.teamMembers.length > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs text-gray-500 font-medium">
                  {product.teamMembers.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
      </div>
    </Link>
  );
}
