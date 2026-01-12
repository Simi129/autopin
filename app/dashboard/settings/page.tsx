'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Settings as SettingsIcon, User, Bell, Lock, CreditCard, CheckCircle, XCircle } from 'lucide-react';

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  useEffect(() => {
    // Обработка Pinterest callback параметров
    const pinterestConnected = searchParams.get('pinterest_connected');
    const pinterestError = searchParams.get('pinterest_error');

    if (pinterestConnected === 'true') {
      setNotification({
        show: true,
        type: 'success',
        message: 'Pinterest connected successfully! 🎉',
      });
      
      // Очищаем URL после 1 секунды
      setTimeout(() => {
        router.replace('/dashboard/settings');
      }, 1000);
      
      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }

    if (pinterestError) {
      setNotification({
        show: true,
        type: 'error',
        message: `Failed to connect Pinterest: ${pinterestError}`,
      });
      
      // Очищаем URL после 1 секунды
      setTimeout(() => {
        router.replace('/dashboard/settings');
      }, 1000);
      
      // Скрываем уведомление через 5 секунд
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  }, [searchParams, router]);

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <>
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`
            rounded-lg shadow-lg p-4 min-w-[320px] max-w-md
            ${notification.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }
          `}>
            <div className="flex items-start gap-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium text-sm ${
                  notification.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button
                onClick={closeNotification}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
      </header>

      <div className="p-8 max-w-4xl">
        <div className="space-y-6">
          {[
            { icon: <User size={20} />, title: 'Profile', description: 'Manage your profile information' },
            { icon: <Bell size={20} />, title: 'Notifications', description: 'Configure notification preferences' },
            { icon: <Lock size={20} />, title: 'Privacy & Security', description: 'Control your privacy settings' },
            { icon: <CreditCard size={20} />, title: 'Billing', description: 'Manage your subscription and billing' },
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-full bg-white rounded-xl border border-slate-200 p-6 hover:border-rose-200 hover:shadow-sm transition-all text-left flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <>
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        </header>
        <div className="p-8 max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </>
    }>
      <SettingsContent />
    </Suspense>
  );
}