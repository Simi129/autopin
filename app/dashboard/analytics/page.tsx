'use client';

import { TrendingUp, Eye, Heart, MessageCircle } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Analytics</h1>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: <Eye />, label: 'Total Views', value: '12.5K', change: '+12.3%' },
            { icon: <Heart />, label: 'Total Saves', value: '3.2K', change: '+8.1%' },
            { icon: <MessageCircle />, label: 'Comments', value: '842', change: '+5.2%' },
            { icon: <TrendingUp />, label: 'Growth Rate', value: '23%', change: '+4.1%' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold text-emerald-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}