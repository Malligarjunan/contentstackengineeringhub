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
        branch: 'main'
      },
      ssr: true, // Enable Server-Side Rendering mode
      mode: 'builder',
      editButton: {
        enable: true, // Show edit button on hoverable elements
        includeByQueryParameter: true,
        position: "bottom",
      },
      editInVisualBuilderButton: {
        enable: false
        },
      stackSdk: {
        environment: config.environment,
        live_preview: {
          enable: true,
          preview_token: config.previewToken,
          host: config.host,
        },
      },
      clientUrlParams: {
        protocol: typeof window !== 'undefined' ? window.location.protocol.replace(':', '') as 'http' | 'https' : 'https',
        host: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
        port: typeof window !== 'undefined' ? parseInt(window.location.port) || (window.location.protocol === 'https:' ? 443 : 80) : 3000,
      }
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
    previewToken: 'cs516552086bfe0fd02f80ea88',
    host: process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'api.contentstack.io',
  };
};

export default ContentstackLivePreview;

