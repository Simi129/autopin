'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        console.log('Callback params:', { token_hash, type });

        if (!token_hash || !type) {
          console.error('Missing token_hash or type');
          setError('Invalid confirmation link');
          setTimeout(() => router.push('/login?error=invalid_link'), 2000);
          return;
        }

        const supabase = createClient();

        // Ð’ÐµÑ€Ð¸Ñ„Ð¸Ñ†Ð¸Ñ€ÑƒÐµÐ¼ OTP Ñ‚Ð¾ÐºÐµÐ½
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as any,
        });

        if (verifyError) {
          console.error('Verify error:', verifyError);
          setError(verifyError.message);
          setTimeout(() => router.push('/login?error=verify_failed'), 2000);
          return;
        }

        console.log('Verification successful:', data);

        // ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐµÐ¼ ÑÐµÑÑÐ¸ÑŽ
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to create session');
          setTimeout(() => router.push('/login?error=session_failed'), 2000);
          return;
        }

        if (!session) {
          console.error('No session after verification');
          setError('No active session');
          setTimeout(() => router.push('/login?error=no_session'), 2000);
          return;
        }

        console.log('Session created, redirecting to dashboard');
        router.push('/dashboard');
        
      } catch (error: any) {
        console.error('Callback error:', error);
        setError(error.message || 'An error occurred');
        setTimeout(() => router.push('/login?error=callback_failed'), 2000);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        {error ? (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-slate-600 mb-2">Verification failed</p>
            <p className="text-sm text-slate-500">{error}</p>
            <p className="text-xs text-slate-400 mt-2">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Confirming your email...</p>
            <p className="text-sm text-slate-500 mt-2">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}