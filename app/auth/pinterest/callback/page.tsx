'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PinterestCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const pinterestConnected = searchParams.get('pinterest_connected');
        const pinterestError = searchParams.get('pinterest_error');

        console.log('Pinterest callback params:', { 
          pinterestConnected, 
          pinterestError,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (pinterestError === 'true') {
          setError('Failed to connect Pinterest account');
          setTimeout(() => router.push('/dashboard/settings?error=pinterest_failed'), 2000);
          return;
        }

        if (pinterestConnected === 'true') {
          console.log('Pinterest connected successfully, redirecting to dashboard');
          router.push('/dashboard/settings?success=pinterest_connected');
          return;
        }

        // Если нет параметров, это ошибка
        console.error('No callback parameters found');
        setError('Invalid callback - missing parameters');
        setTimeout(() => router.push('/dashboard/settings?error=invalid_callback'), 2000);
        
      } catch (error: any) {
        console.error('Pinterest callback error:', error);
        setError(error.message || 'An error occurred during Pinterest connection');
        setTimeout(() => router.push('/dashboard/settings?error=callback_failed'), 2000);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md">
        {error ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Connection Failed</h2>
            <p className="text-slate-600 mb-2">{error}</p>
            <p className="text-sm text-slate-500">Redirecting to settings...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.69 0-1.25-.56-1.25-1.25S11.31 16.5 12 16.5s1.25.56 1.25 1.25S12.69 19 12 19zm1.063-7.407c-.382.382-.563.75-.563 1.157v.75h-1v-.75c0-.657.281-1.282.844-1.844L13.5 9.75c.281-.281.5-.593.5-.969 0-.72-.53-1.281-1.281-1.281H12c-.72 0-1.281.53-1.281 1.281H9.5c0-1.657 1.343-3 3-3h.719c1.688 0 3 1.343 3 3 0 .782-.343 1.532-.969 2.156l-1.187 1.656z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Connecting Pinterest</h2>
            <p className="text-slate-600">Processing your Pinterest connection...</p>
            <p className="text-sm text-slate-500 mt-2">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PinterestCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <PinterestCallbackContent />
    </Suspense>
  );
}