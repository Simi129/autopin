'use client';

import { useViewStore } from '@/hooks/useViewSwitcher';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Navigation, ChatWidget } from '@/components/shared';
import { LandingPage } from '@/components/landing';
import { AuthView } from '@/components/auth';
import { DashboardView } from '@/components/dashboard';

export default function Home() {
  const { currentView } = useViewStore();
  
  useProtectedRoute();

  return (
    <>
      <Navigation />
      
      {currentView === 'landing' && (
        <div className="view-transition">
          <LandingPage />
        </div>
      )}
      
      {currentView === 'auth' && (
        <div className="view-transition">
          <AuthView />
        </div>
      )}
      
      {currentView === 'dashboard' && (
        <div className="view-transition">
          <DashboardView />
        </div>
      )}
      
      <ChatWidget />
    </>
  );
}