'use client';

import { useEffect, useState } from 'react';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { Product } from '@/types/product';

interface ProductLivePreviewProps {
  product: Product;
  children: (product: Product) => React.ReactNode;
}

/**
 * Product Live Preview Component
 * Enables real-time preview updates for product pages
 * 
 * This component wraps the product content and listens for Live Preview changes.
 * When content is updated in Contentstack, it automatically refreshes the product data.
 */
export default function ProductLivePreview({ product: initialProduct, children }: ProductLivePreviewProps) {
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    // Only enable Live Preview on client-side
    if (typeof window === 'undefined') return;

    // Listen for entry changes from Contentstack Live Preview
    ContentstackLivePreview.onEntryChange(async () => {
      console.log('🔄 Live Preview detected content change, refreshing...');
      
      // In SSR mode, we need to reload the page to fetch updated content from server
      // The server will fetch draft content when Live Preview is active
      window.location.reload();
    });

    console.log('✅ Live Preview listener registered for product:', product.slug);

    // Cleanup
    return () => {
      // ContentstackLivePreview cleanup is handled automatically
    };
  }, [product.slug]);

  return <>{children(product)}</>;
}

