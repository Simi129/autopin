'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleCallback = async () => {
      try {
        // Проверяем, есть ли code в URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
          // Обмениваем code на session
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error('Auth error:', error);
            router.push('/login?error=auth_failed');
            return;
          }
        }
        
        // Проверяем сессию
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.error('Session error:', sessionError);
          router.push('/login?error=no_session');
          return;
        }
        
        // Успешно - редирект в dashboard
        router.push('/dashboard');
        
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/login?error=callback_failed');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Confirming your email...</p>
      </div>
    </div>
  );
}