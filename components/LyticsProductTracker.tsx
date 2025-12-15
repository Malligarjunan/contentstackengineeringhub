'use client';

import { useEffect } from 'react';

interface LyticsProductTrackerProps {
  product: {
    id: string;
    title: string;
    slug: string;
    category: string;
    shortDescription?: string;
  };
}

declare global {
  interface Window {
    jstag: {
      send: (data: Record<string, any>) => void;
      pageView: () => void;
    };
  }
}

export default function LyticsProductTracker({ product }: LyticsProductTrackerProps) {
  useEffect(() => {
    // Wait for jstag to be available
    const trackVisit = () => {
      if (typeof window !== 'undefined' && window.jstag) {
        try {
          // Send product visit event
          window.jstag.send({
            event: 'product_visit',
            product_id: product.id,
            product_title: product.title,
            product_slug: product.slug,
            product_category: product.category,
            product_description: product.shortDescription || '',
            page_url: window.location.href,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString(),
            pageview: 1
          });

          console.log('📊 Lytics: Product visit tracked', {
            product: product.title,
            category: product.category,
          });
        } catch (error) {
          console.error('❌ Lytics tracking error:', error);
        }
      }
    };

    // Try immediate tracking
    trackVisit();

    // Also track after a short delay to ensure jstag is loaded
    const timeoutId = setTimeout(trackVisit, 500);

    return () => clearTimeout(timeoutId);
  }, [product.id, product.title, product.slug, product.category, product.shortDescription]);

  return null; // This component doesn't render anything
}

