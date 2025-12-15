'use client';

import { usePersonalize } from '@/components/context/PersonalizeContext';

/**
 * Hook to trigger Personalize events and set attributes
 * 
 * @example
 * const { triggerEvent, setAttribute } = usePersonalizeEvent();
 * 
 * // Trigger a conversion event
 * await triggerEvent('buttonClicked');
 * 
 * // Set user attributes
 * await setAttribute({ role: 'developer', team: 'frontend' });
 */
export function usePersonalizeEvent() {
  const personalizeSdk = usePersonalize();

  /**
   * Trigger a conversion event
   */
  const triggerEvent = async (eventKey: string, metadata?: Record<string, any>) => {
    if (!personalizeSdk) {
      console.warn('⚠️ Personalize SDK not initialized');
      return;
    }

    try {
      await personalizeSdk.triggerEvent(eventKey);
      console.log(`📊 Personalize: Event "${eventKey}" triggered`, metadata || '');
    } catch (error) {
      console.error(`❌ Personalize: Error triggering event "${eventKey}":`, error);
    }
  };

  /**
   * Set user attributes
   */
  const setAttribute = async (attributes: Record<string, any>) => {
    if (!personalizeSdk) {
      console.warn('⚠️ Personalize SDK not initialized');
      return;
    }

    try {
      await personalizeSdk.set(attributes);
      console.log('📊 Personalize: Attributes set', attributes);
    } catch (error) {
      console.error('❌ Personalize: Error setting attributes:', error);
    }
  };

  return {
    triggerEvent,
    setAttribute,
    isReady: !!personalizeSdk,
  };
}

