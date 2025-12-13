'use client';

interface TextWithCopyProps {
  text: string;
  className?: string;
}

/**
 * Component that displays text with smart URL handling
 * - Detects URLs and makes them clickable
 * - Truncates long text to fit container
 * - Shows full text in tooltip on hover
 */
export default function TextWithCopy({ text, className = '' }: TextWithCopyProps) {
  // Detect if text contains a URL
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hasUrl = urlRegex.test(text);
  
  const handleClick = () => {
    // Extract URL from text
    const match = text.match(urlRegex);
    if (match && match[0]) {
      window.open(match[0], '_blank', 'noopener,noreferrer');
    }
  };

  // Render text with clickable links
  const renderTextWithLinks = () => {
    const parts = text.split(urlRegex);
    const urls: string[] = text.match(urlRegex) || [];
    
    return parts.map((part, index) => {
      if (part && urls.includes(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline decoration-dotted hover:decoration-solid transition-all font-medium inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">{part}</span>
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div 
      className="flex items-start gap-2 group/item w-full overflow-hidden"
      title={text}  // Show full text on hover
    >
      <span className={`flex-1 min-w-0 ${className}`}>
        {renderTextWithLinks()}
      </span>
      
      {hasUrl && (
        <button
          onClick={handleClick}
          className="opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0 p-1.5 hover:bg-slate-100 rounded-lg"
          title="Open URL in new tab"
        >
          <svg className="w-4 h-4 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      )}
    </div>
  );
}

