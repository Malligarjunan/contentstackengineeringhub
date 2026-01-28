import ContentstackLivePreview from '@contentstack/live-preview-utils';

// Live Preview configuration
export const initLivePreview = (config: {
  enabled: boolean;
  apiKey: string;
  environment: string;
  previewToken: string;
  host: string;
  deliveryToken: string;
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
      ssr: true, // Server-Side Rendering mode - page refreshes on content changes
      mode: 'builder', // Supports both Live Preview and Visual Builder
      editButton: {
        enable: true, // Show edit buttons on hover
        includeByQueryParameter: true, // Allow ?cslp-buttons=true for testing
        position: "top", // Position of edit buttons
      },
      editInVisualBuilderButton: {enable: false},
      // Note: stackSdk is NOT needed for SSR mode (ssr: true)
      // It's only required for CSR mode (ssr: false)
      clientUrlParams: {
        protocol: typeof window !== 'undefined' ? window.location.protocol.replace(':', '') as 'http' | 'https' : 'https',
        host: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
        port: typeof window !== 'undefined' ? (parseInt(window.location.port) || (window.location.protocol === 'https:' ? 443 : 80)) : 3000,
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
    apiKey: process.env.CONTENTSTACK_API_KEY || '',
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
    previewToken: process.env.CONTENTSTACK_LIVE_PREVIEW_TOKEN || '',
    host: process.env.CONTENTSTACK_LIVE_PREVIEW_HOST || 'rest-preview.contentstack.com',
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
  };
};

export default ContentstackLivePreview;

