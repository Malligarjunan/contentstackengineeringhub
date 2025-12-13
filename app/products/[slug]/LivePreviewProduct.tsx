'use client';

import { useEffect, useState } from 'react';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { Product } from '@/types/product';

interface LivePreviewProductProps {
  initialProduct: Product;
  children: (product: Product) => React.ReactNode;
}

/**
 * Live Preview wrapper for product pages
 * Enables real-time content updates in Contentstack Live Preview
 */
export default function LivePreviewProduct({ initialProduct, children }: LivePreviewProductProps) {
  const [product, setProduct] = useState<Product>(initialProduct);

  useEffect(() => {
    // Check if we're in Live Preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const isLivePreview = urlParams.get('live_preview') !== null;

    if (!isLivePreview) {
      // Not in Live Preview mode, just render static content
      return;
    }

    console.log('🔴 Live Preview mode detected for product:', product.slug);

    // Set up listener for entry changes
    // This callback is triggered when content is updated in Contentstack
    ContentstackLivePreview.onEntryChange(async () => {
      console.log('🔄 Live Preview: Entry content changed');
      console.log('♻️  Reloading page to fetch latest draft content...');
      
      // For SSR with Next.js, we reload the page to fetch fresh data from server
      // The server will use the preview token to fetch the latest draft content
      window.location.reload();
    });

    console.log('✅ Live Preview listener registered');
  }, [product.slug]);

  return <>{children(product)}</>;
}

