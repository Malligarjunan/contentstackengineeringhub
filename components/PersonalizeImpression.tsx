'use client';

import { useEffect } from 'react';
import { usePersonalize } from '@/components/context/PersonalizeContext';

interface PersonalizeImpressionProps {
  experienceShortUid: string;
  experienceName?: string;
}

/**
 * Component to track Personalize impression events
 * Place this component on pages where you want to track that a particular experience was shown to a user
 * 
 * @example
 * <PersonalizeImpression 
 *   experienceShortUid="abc123" 
 *   experienceName="Homepage Hero Variant"
 * />
 */
export default function PersonalizeImpression({ 
  experienceShortUid, 
  experienceName 
}: PersonalizeImpressionProps) {
  const personalizeSdk = usePersonalize();

  useEffect(() => {
    const trackImpression = async () => {
      if (personalizeSdk && experienceShortUid) {
        try {
          await personalizeSdk.triggerImpression(experienceShortUid);
          console.log(`📊 Personalize: Impression tracked for experience "${experienceName || experienceShortUid}"`);
        } catch (error) {
          console.error('❌ Personalize: Error tracking impression:', error);
        }
      }
    };

    trackImpression();
  }, [personalizeSdk, experienceShortUid, experienceName]);

  return null; // This component doesn't render anything
}

