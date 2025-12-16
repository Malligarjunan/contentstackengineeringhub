'use client';

import { useEffect, useState } from 'react';

/**
 * Debug panel to verify Lytics integration
 * Only visible in development mode
 */
export default function LyticsDebugPanel() {
  const [jstagStatus, setJstagStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [eventsSent, setEventsSent] = useState<string[]>([]);
  const [jstagInfo, setJstagInfo] = useState<any>(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const checkJstag = () => {
      if (typeof window !== 'undefined' && window.jstag) {
        if (typeof window.jstag.send === 'function' && window.jstag.config) {
          setJstagStatus('ready');
          setJstagInfo({
            hasConfig: !!window.jstag.config,
            hasSend: typeof window.jstag.send === 'function',
            hasPageView: typeof window.jstag.pageView === 'function',
          });
          
          // Intercept send calls to log them
          const originalSend = window.jstag.send;
          window.jstag.send = function(data: any) {
            setEventsSent(prev => [...prev, `${data.event || 'event'} - ${new Date().toLocaleTimeString()}`]);
            return originalSend.call(this, data);
          };

          return true;
        }
      }
      return false;
    };

    // Check immediately
    if (!checkJstag()) {
      // Retry every 500ms for up to 10 seconds
      let attempts = 0;
      const maxAttempts = 20;
      
      const interval = setInterval(() => {
        attempts++;
        
        if (checkJstag()) {
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          setJstagStatus('error');
          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-slate-900 text-white text-xs rounded-lg shadow-2xl z-50 max-w-sm border-2 border-slate-700">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 rounded-t-lg font-bold flex items-center justify-between">
        <span>📊 Lytics Debug</span>
        <span className={`px-2 py-0.5 rounded text-[10px] ${
          jstagStatus === 'ready' ? 'bg-green-500' : 
          jstagStatus === 'error' ? 'bg-red-500' : 
          'bg-yellow-500 animate-pulse'
        }`}>
          {jstagStatus === 'ready' ? '✓ READY' : 
           jstagStatus === 'error' ? '✗ ERROR' : 
           '⏳ LOADING'}
        </span>
      </div>
      
      <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto">
        {jstagStatus === 'ready' && jstagInfo && (
          <div className="space-y-1">
            <div className="text-green-400 font-semibold">Status: Loaded ✓</div>
            <div className="text-slate-400 text-[10px] space-y-0.5">
              <div>• Config: {jstagInfo.hasConfig ? '✓' : '✗'}</div>
              <div>• send(): {jstagInfo.hasSend ? '✓' : '✗'}</div>
              <div>• pageView(): {jstagInfo.hasPageView ? '✓' : '✗'}</div>
            </div>
          </div>
        )}

        {jstagStatus === 'loading' && (
          <div className="text-yellow-400">
            <div className="animate-pulse">Loading jstag library...</div>
            <div className="text-slate-400 text-[10px] mt-1">
              This should complete in 1-2 seconds
            </div>
          </div>
        )}

        {jstagStatus === 'error' && (
          <div className="text-red-400">
            <div className="font-semibold">Failed to load</div>
            <div className="text-slate-400 text-[10px] mt-1 space-y-1">
              <div>Check:</div>
              <div>• Network tab for script errors</div>
              <div>• Console for error messages</div>
              <div>• Lytics account status</div>
            </div>
          </div>
        )}

        {eventsSent.length > 0 && (
          <div className="border-t border-slate-700 pt-2 mt-2">
            <div className="text-slate-400 font-semibold mb-1">Events Sent:</div>
            <div className="space-y-0.5 text-[10px]">
              {eventsSent.slice(-5).reverse().map((event, i) => (
                <div key={i} className="text-green-400 font-mono">
                  ✓ {event}
                </div>
              ))}
            </div>
            {eventsSent.length > 5 && (
              <div className="text-slate-500 text-[10px] mt-1">
                +{eventsSent.length - 5} more
              </div>
            )}
          </div>
        )}

        <div className="border-t border-slate-700 pt-2 mt-2 text-slate-500 text-[10px]">
          Open browser console for detailed logs
        </div>
      </div>
    </div>
  );
}

