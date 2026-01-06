'use client';

import { useEffect, useState } from 'react';
import { useViewStore } from '@/hooks/useViewSwitcher';
import { supabase } from '@/lib/supabase';

export function useProtectedRoute() {
  const { currentView, setView } = useViewStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();

    // Подписка на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const authenticated = !!session;
      setIsAuthenticated(authenticated);

      // Если пользователь вышел и находится в дашборде - редирект на landing
      if (!authenticated && currentView === 'dashboard') {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [currentView, setView]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const authenticated = !!session;
    setIsAuthenticated(authenticated);

    // Если пользователь не авторизован и пытается попасть в дашборд
    if (!authenticated && currentView === 'dashboard') {
      setView('auth');
    }
  };

  return { isAuthenticated };
}