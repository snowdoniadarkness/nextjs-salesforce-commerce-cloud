'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dw: {
      sfcc: {
        livePreview: {
          enabled: boolean;
          host: string;
          port: string;
          path: string;
          protocol: string;
          query: string;
        };
      };
    };
  }
}

export default function LivePreview() {
  useEffect(() => {
    // Initialize Live Preview SDK
    if (typeof window !== 'undefined' && window.dw?.sfcc?.livePreview?.enabled) {
      const script = document.createElement('script');
      script.src = '/static/js/live-preview.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return null;
} 