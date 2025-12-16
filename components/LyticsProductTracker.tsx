'use client';

import { useEffect, useRef } from 'react';

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
    jstag?: {
      send: (data: Record<string, any>) => void;
      pageView: () => void;
    };
  }
}

export default function LyticsProductTracker({ product }: LyticsProductTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Wait for jstag to be available
    const trackVisit = () => {
      if (typeof window !== 'undefined' && window.jstag && !hasTracked.current) {
        try {
          // First, send the standard Lytics pageView event
          window.jstag.pageView();
          console.log('📊 Lytics: PageView event sent for product page');

          // Then send custom product_visit event with details
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

          console.log('📊 Lytics: Product visit event tracked', {
            product: product.title,
            category: product.category,
            url: window.location.pathname,
          });

          hasTracked.current = true;
        } catch (error) {
          console.error('❌ Lytics tracking error:', error);
        }
      } else if (!window.jstag) {
        // Retry if jstag is not yet available
        console.log('⏳ Lytics: Waiting for jstag to load...');
      }
    };

    // Try immediate tracking
    trackVisit();

    // Also track after a short delay to ensure jstag is loaded
    const timeoutId = setTimeout(trackVisit, 500);

    // Retry up to 3 times if jstag is not available
    const retryTimeoutId = setTimeout(trackVisit, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(retryTimeoutId);
    };
  }, [product.id, product.title, product.slug, product.category, product.shortDescription]);

  return null; // This component doesn't render anything
}

