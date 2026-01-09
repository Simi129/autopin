'use client';

import { Users } from 'lucide-react';

export default function AudiencePage() {
  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Audience</h1>
      </header>

      <div className="p-8">
        <div className="text-center py-20">
          <Users size={64} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your Audience</h2>
          <p className="text-slate-500">Understand who's engaging with your content</p>
        </div>
      </div>
    </>
  );
}