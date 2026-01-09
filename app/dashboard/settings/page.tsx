'use client';

import { Settings as SettingsIcon, User, Bell, Lock, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
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