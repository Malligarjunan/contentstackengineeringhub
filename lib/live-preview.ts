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
    enabled: true,
    apiKey: 'bltf8cdf3fabab37ee8',
    environment: 'production',
    previewToken: 'cs516552086bfe0fd02f80ea88',
    host:  'rest-preview.contentstack.com',
  };
};

export default ContentstackLivePreview;

