'use client';

import { Navigation, ChatWidget } from '@/components/shared';
import { LandingPage } from '@/components/landing';

export default function Home() {
  return (
    <>
      <Navigation />
      <LandingPage />
      <ChatWidget />
    </>
  );
}