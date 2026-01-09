'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.search);
      
      if (error) {
        router.push('/login?error=auth_failed');
      } else {
        router.push('/dashboard');
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