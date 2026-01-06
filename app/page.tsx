'use client';

import { useViewStore } from '@/hooks/useViewSwitcher';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import AuthView from '@/components/AuthView';
import DashboardView from '@/components/DashboardView';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  const { currentView } = useViewStore();
  
  // Защита роутов - проверяет авторизацию
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