'use client';

import { useEffect, useState } from 'react';
import { useViewStore } from '@/hooks/useViewSwitcher';
import { supabase } from '@/lib/supabase';

export function useProtectedRoute() {
  const { currentView, setView } = useViewStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    checkAuth();

    // Подписка на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const authenticated = !!session;
      setIsAuthenticated(authenticated);

      // Автоматический редирект в дашборд после успешного входа/регистрации
      if (event === 'SIGNED_IN' && authenticated && currentView === 'auth') {
        setView('dashboard');
      }

      // Если пользователь вышел и находится в дашборде - редирект на landing
      if (event === 'SIGNED_OUT' && !authenticated && currentView === 'dashboard') {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [currentView, setView]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const authenticated = !!session;
      setIsAuthenticated(authenticated);

      // Если пользователь авторизован и находится на странице auth - редирект в дашборд
      if (authenticated && currentView === 'auth') {
        setView('dashboard');
      }

      // Если пользователь не авторизован и пытается попасть в дашборд - редирект на auth
      if (!authenticated && currentView === 'dashboard') {
        setView('auth');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsInitializing(false);
    }
  };

  return { isAuthenticated, isInitializing };
}