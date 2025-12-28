/**
 * PageLoader Component
 * Displays a loading spinner while page content is being fetched
 */
export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="relative inline-block">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
          
          {/* Spinning ring */}
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 space-y-2">
          <p className="text-lg font-bold text-slate-900 animate-pulse">
            Loading Content...
          </p>
          <p className="text-sm text-slate-500">
            Fetching from Contentstack
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}

