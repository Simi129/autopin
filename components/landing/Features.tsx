'use client';

import { Zap, TrendingUp, Clock } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'AI-Powered Automation',
    description: 'Schedule pins automatically with smart timing based on when your audience is most active.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Advanced Analytics',
    description: 'Track performance metrics, identify trending content, and optimize your strategy in real-time.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Bulk Scheduling',
    description: 'Upload and schedule hundreds of pins at once. Set it and forget it while we handle the rest.',
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-slate-900 mb-4">
          Everything you need to grow
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Powerful tools designed to save you time and maximize your Pinterest performance.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-rose-200 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}