'use client';

import { useEffect } from 'react';
import { initLivePreview } from '@/lib/live-preview';

interface LivePreviewProviderProps {
  config: {
    enabled: boolean;
    apiKey: string;
    environment: string;
    previewToken: string;
    host: string;
  };
}

/**
 * Live Preview Provider Component
 * Initializes Contentstack Live Preview for real-time content updates
 */
export default function LivePreviewProvider({ config }: LivePreviewProviderProps) {
  useEffect(() => {
    // Initialize Live Preview on component mount with server-side config
    initLivePreview(config);
  }, [config]);

  // This component doesn't render anything
  return null;
}

