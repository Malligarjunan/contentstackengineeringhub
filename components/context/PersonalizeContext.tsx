'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Personalize from '@contentstack/personalize-edge-sdk';
import { Sdk } from '@contentstack/personalize-edge-sdk/dist/sdk';

const PersonalizeContext = createContext<Sdk | null>(null);

let sdkInstance: Sdk | null = null;
let initializationPromise: Promise<Sdk | null> | null = null;

export function PersonalizeProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<Sdk | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPersonalizeInstance()
      .then((instance) => {
        setSdk(instance);
        if (instance) {
          console.log('✅ Personalize SDK initialized successfully');
        }
      })
      .catch((err) => {
        console.error('❌ Failed to initialize Personalize SDK:', err);
        setError(err.message);
      });
  }, []);

  // Log error state for debugging
  useEffect(() => {
    if (error) {
      console.error('⚠️ Personalize initialization error:', error);
    }
  }, [error]);

  return (
    <PersonalizeContext.Provider value={sdk}>
      {children}
    </PersonalizeContext.Provider>
  );
}

export function usePersonalize() {
  return useContext(PersonalizeContext);
}

async function getPersonalizeInstance(): Promise<Sdk | null> {
  // Return existing instance if already initialized
  if (sdkInstance) {
    return sdkInstance;
  }

  // Wait for ongoing initialization if in progress
  if (initializationPromise) {
    return initializationPromise;
  }

  // Only initialize in browser
  if (typeof window === 'undefined') {
    return null;
  }

  const projectUid = process.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID;
  
  if (!projectUid) {
    console.warn('⚠️ Personalize: NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID not configured');
    console.warn('⚠️ Add this to your .env.local file to enable Personalize');
    return null;
  }

  // Create initialization promise
  initializationPromise = (async () => {
    try {
      // Check if already initialized
      if (Personalize.getInitializationStatus()) {
        console.log('ℹ️ Personalize SDK already initialized');
        return sdkInstance;
      }

      console.log('🔄 Initializing Personalize SDK with project:', projectUid);
      
      // Initialize the SDK
      sdkInstance = await Personalize.init(projectUid);
      
      console.log('✅ Personalize SDK initialized successfully');
      console.log('📊 SDK methods available:', Object.keys(sdkInstance));
      
      return sdkInstance;
    } catch (error: any) {
      console.error('❌ Personalize SDK initialization failed:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        projectUid: projectUid ? `${projectUid.substring(0, 4)}...` : 'undefined'
      });
      sdkInstance = null;
      throw error;
    } finally {
      initializationPromise = null;
    }
  })();

  return initializationPromise;
}

