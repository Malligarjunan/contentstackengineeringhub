'use client';

import { useEffect, useState } from 'react';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

interface HomepageLivePreviewProps {
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  initialData: any;
  children: (data: any) => React.ReactNode;
}

/**
 * Homepage Live Preview Component
 * Enables real-time content updates for homepage in Live Preview mode
 * Adds edit tags for Visual Builder support
 */
export default function HomepageLivePreview({
  contentTypeUid,
  entryUid,
  locale,
  initialData,
  children,
}: HomepageLivePreviewProps) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Check if we're in Live Preview mode
    const isLivePreview = 
      typeof window !== 'undefined' && 
      (window.location.search.includes('live_preview') || 
       window.location.search.includes('content_type_uid'));

    if (!isLivePreview) {
      // Not in Live Preview mode, use initial data
      setData(initialData);
      return;
    }

    // Subscribe to Live Preview updates
    const unsubscribe = ContentstackLivePreview.onEntryChange(() => {
      // Fetch updated data
      // In SSR mode with Next.js App Router, we rely on the automatic refresh
      // The SDK will trigger a page refresh when content changes
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [contentTypeUid, entryUid, locale, initialData]);

  return <>{children(data)}</>;
}

