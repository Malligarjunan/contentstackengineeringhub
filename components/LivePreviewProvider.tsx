'use client';

import { useEffect } from 'react';
import { initLivePreview } from '@/lib/live-preview';

/**
 * Live Preview Provider Component
 * Initializes Contentstack Live Preview for real-time content updates
 */
export default function LivePreviewProvider() {
  useEffect(() => {
    // Initialize Live Preview on component mount
    initLivePreview();
  }, []);

  // This component doesn't render anything
  return null;
}

