'use client';

import Link from 'next/link';
import { usePersonalizeEvent } from '@/hooks/usePersonalizeEvent';

interface PersonalizedCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  eventKey?: string;
}

/**
 * Example personalized CTA component with Personalize event tracking
 * This demonstrates how to track conversion events when users interact with personalized content
 */
export default function PersonalizedCTA({
  title = "Get Started with Contentstack",
  description = "Join thousands of developers building amazing digital experiences",
  primaryButtonText = "Start Free Trial",
  primaryButtonUrl = "/sign-up",
  secondaryButtonText = "View Docs",
  secondaryButtonUrl = "/docs",
  eventKey = "cta_interaction"
}: PersonalizedCTAProps) {
  const { triggerEvent, isReady } = usePersonalizeEvent();

  const handlePrimaryClick = async () => {
    if (isReady) {
      await triggerEvent(`${eventKey}_primary`);
    }
  };

  const handleSecondaryClick = async () => {
    if (isReady) {
      await triggerEvent(`${eventKey}_secondary`);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-black mb-6">
        {title}
      </h2>
      <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={primaryButtonUrl}
          onClick={handlePrimaryClick}
          className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
        >
          {primaryButtonText}
        </Link>
        <Link
          href={secondaryButtonUrl}
          onClick={handleSecondaryClick}
          className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
        >
          {secondaryButtonText}
        </Link>
      </div>
    </div>
  );
}

