import ContentstackLivePreview from '@contentstack/live-preview-utils';

// Live Preview configuration
export const initLivePreview = () => {
  if (typeof window === 'undefined') return; // Only run on client-side

  const isLivePreviewEnabled = 
    process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true';

  if (!isLivePreviewEnabled) {
    console.log('ℹ️  Live Preview is disabled');
    return;
  }

  try {
    ContentstackLivePreview.init({
      enable: true,
      stackDetails: {
        apiKey: process.env.CONTENTSTACK_API_KEY || process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
      },
      ssr: true, // Enable Server-Side Rendering mode
      editButton: {
        enable: true, // Show edit button on hoverable elements
        position: 'top-right',
      },
      stackSdk: {
        live_preview: {
          enable: true,
          preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN || '',
          host: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_HOST || 'api.contentstack.io',
        },
      },
    });

    console.log('✅ Live Preview initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Live Preview:', error);
  }
};

// Hook to use in components for live updates
export const useLivePreview = () => {
  const isEnabled = 
    process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true';

  return {
    isEnabled,
    ContentstackLivePreview,
  };
};

export default ContentstackLivePreview;

