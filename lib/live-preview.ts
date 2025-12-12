import ContentstackLivePreview from '@contentstack/live-preview-utils';

// Live Preview configuration
export const initLivePreview = (config: {
  enabled: boolean;
  apiKey: string;
  environment: string;
  previewToken: string;
  host: string;
}) => {
  if (typeof window === 'undefined') return; // Only run on client-side

  if (!config.enabled) {
    console.log('ℹ️  Live Preview is disabled');
    return;
  }

  try {
    ContentstackLivePreview.init({
      enable: true,
      stackDetails: {
        apiKey: config.apiKey,
        environment: config.environment,
      },
      ssr: true, // Enable Server-Side Rendering mode
      editButton: {
        enable: true, // Show edit button on hoverable elements
        position: 'top-right',
      },
      stackSdk: {
        environment: config.environment,
        live_preview: {
          enable: true,
          preview_token: config.previewToken,
          host: config.host,
        },
      },
    });

    console.log('✅ Live Preview initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Live Preview:', error);
  }
};

// Get Live Preview configuration (server-side only)
export const getLivePreviewConfig = () => {
  return {
    enabled: process.env.CONTENTSTACK_LIVE_PREVIEW_ENABLED === 'true',
    apiKey: process.env.CONTENTSTACK_API_KEY || '',
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
    previewToken: process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN || '',
    host: process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'api.contentstack.io',
  };
};

export default ContentstackLivePreview;

