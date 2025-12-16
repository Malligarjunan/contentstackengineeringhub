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
      config?: any;
    };
  }
}

export default function LyticsProductTracker({ product }: LyticsProductTrackerProps) {
  const hasTracked = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 10; // Try up to 10 times

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    const isJstagReady = () => {
      return (
        typeof window !== 'undefined' &&
        window.jstag &&
        typeof window.jstag.send === 'function' &&
        typeof window.jstag.pageView === 'function' &&
        window.jstag.config // Check if jstag is fully initialized
      );
    };

    const trackVisit = () => {
      // Skip if already tracked
      if (hasTracked.current) {
        return;
      }

      // Check if jstag is ready
      if (!isJstagReady()) {
        retryCount.current++;
        
        if (retryCount.current <= maxRetries) {
          console.log(`⏳ Lytics: Waiting for jstag to load... (attempt ${retryCount.current}/${maxRetries})`);
          
          // Exponential backoff: 100ms, 200ms, 400ms, 800ms, etc.
          const delay = Math.min(100 * Math.pow(2, retryCount.current - 1), 5000);
          const timeoutId = setTimeout(trackVisit, delay);
          timeouts.push(timeoutId);
        } else {
          console.error('❌ Lytics: jstag failed to load after', maxRetries, 'attempts');
          console.log('💡 Check if Lytics script is loading correctly in Network tab');
        }
        return;
      }

      // jstag is ready, send events
      try {
        console.log('✅ Lytics: jstag is ready, sending events...');

        // First, send the standard Lytics pageView event
        window.jstag!.pageView();
        console.log('📊 Lytics: PageView event sent for product page');

        // Small delay to ensure pageView is processed
        setTimeout(() => {
          try {
            // Then send custom product_visit event with details
            const eventData = {
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
            };

            window.jstag!.send(eventData);

            console.log('📊 Lytics: Product visit event sent successfully', {
              product: product.title,
              category: product.category,
              url: window.location.pathname,
              eventData: eventData
            });

            hasTracked.current = true;
          } catch (error) {
            console.error('❌ Lytics: Error sending product_visit event:', error);
          }
        }, 100);

      } catch (error) {
        console.error('❌ Lytics: Error sending pageView event:', error);
        console.log('💡 Check browser console for additional errors');
      }
    };

    // Start tracking with initial delay to let page settle
    const initialTimeout = setTimeout(trackVisit, 500);
    timeouts.push(initialTimeout);

    // Cleanup
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [product.id, product.title, product.slug, product.category, product.shortDescription]);

  return null; // This component doesn't render anything
}

