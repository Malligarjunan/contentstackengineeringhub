'use client';

import { useEffect } from 'react';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

interface LivePreviewProductProps {
  children: React.ReactNode;
}

/**
 * Live Preview wrapper for product pages
 * Enables real-time content updates in Contentstack Live Preview
 */
export default function LivePreviewProduct({ children }: LivePreviewProductProps) {
  useEffect(() => {
    // Check if we're in Live Preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const isLivePreview = urlParams.get('live_preview') !== null;

    if (!isLivePreview) {
      // Not in Live Preview mode, just render static content
      return;
    }

    console.log('🔴 Live Preview mode detected');

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
  }, []);

  return <>{children}</>;
}

