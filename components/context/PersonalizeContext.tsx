'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Personalize from '@contentstack/personalize-edge-sdk';
import { Sdk } from '@contentstack/personalize-edge-sdk/dist/sdk';

const PersonalizeContext = createContext<Sdk | null>(null);

let sdkInstance: Sdk | null = null;

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    getPersonalizeInstance().then(setSdk);
  }, []);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}

async function getPersonalizeInstance() {
  if (!sdkInstance && typeof window !== 'undefined') {
    const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;
    
    if (!projectUid) {
      console.warn('⚠️ Personalize: Project UID not configured');
      return null;
    }

    try {
      if (!Personalize.getInitializationStatus()) {
        sdkInstance = await Personalize.init(projectUid);
        console.log('✅ Personalize SDK initialized successfully');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Personalize SDK:', error);
      return null;
    }
  }
  return sdkInstance;
}

