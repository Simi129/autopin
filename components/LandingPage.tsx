'use client';

import { useViewStore } from '@/hooks/useViewSwitcher';
import { ArrowRight, PlayCircle, Zap, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  const { setView } = useViewStore();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 text-center py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          New: AI Caption Generator
        </div>
        <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 tracking-tight mb-6 leading-[1.1]">
          Automate your inspiration.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Scale your revenue.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          The all-in-one platform to schedule pins, analyze trends, and grow your audience on Pinterest without the manual grind.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setView('dashboard')} 
            className="h-12 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20"
          >
            Get Started 
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
          <button className="h-12 px-8 rounded-full bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
            <PlayCircle size={18} strokeWidth={1.5} />
            Watch Demo
          </button>
        </div>
      </section>

      {/* Dashboard Preview Image */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="relative rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden p-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-blue-500/5"></div>
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            {/* Mock Browser Header */}
            <div className="h-8 bg-white border-b border-slate-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-orange-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
            {/* Mock Content Area */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90 select-none pointer-events-none">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm col-span-2">
                <div className="h-4 w-1/3 bg-slate-100 rounded mb-4"></div>
                <div className="flex items-end gap-2 h-32">
                  <div className="w-full bg-rose-50 rounded-t h-[40%]"></div>
                  <div className="w-full bg-rose-100 rounded-t h-[70%]"></div>
                  <div className="w-full bg-rose-500 rounded-t h-[55%]"></div>
                  <div className="w-full bg-rose-200 rounded-t h-[80%]"></div>
                  <div className="w-full bg-rose-50 rounded-t h-[45%]"></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-100"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">Everything you need to grow</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Powerful tools designed to save you time and maximize your Pinterest performance.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
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
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-rose-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose the plan that fits your needs. All plans include a 14-day free trial.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Starter',
              price: '$19',
              description: 'Perfect for getting started',
              features: ['Up to 100 pins/month', 'Basic analytics', '1 Pinterest account', 'Email support'],
              popular: false,
            },
            {
              name: 'Pro',
              price: '$49',
              description: 'For serious content creators',
              features: ['Up to 1,000 pins/month', 'Advanced analytics', '5 Pinterest accounts', 'Priority support', 'AI caption generator'],
              popular: true,
            },
            {
              name: 'Business',
              price: '$99',
              description: 'For teams and agencies',
              features: ['Unlimited pins', 'Team collaboration', 'Unlimited accounts', '24/7 support', 'White-label reports', 'API access'],
              popular: false,
            },
          ].map((plan, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-8 rounded-2xl border-2 ${plan.popular ? 'border-rose-500 shadow-xl scale-105' : 'border-slate-200'} relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-rose-500 to-orange-400 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setView('auth')}
                className={`w-full py-3 rounded-full font-medium transition-all ${
                  plan.popular 
                    ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-500">Everything you need to know about Pinflow.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How does the 14-day free trial work?',
              a: 'Start using Pinflow immediately with full access to all features. No credit card required. Cancel anytime during the trial period.',
            },
            {
              q: 'Can I switch plans later?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing accordingly.',
            },
            {
              q: 'Do you support multiple Pinterest accounts?',
              a: 'Absolutely. All paid plans support multiple Pinterest accounts, making it easy to manage brands, clients, or personal projects.',
            },
            {
              q: 'Is my data secure?',
              a: 'Yes. We use bank-level encryption and never store your Pinterest passwords. We only request the minimum permissions needed to schedule pins.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for your convenience.',
            },
          ].map((faq, idx) => (
            <details key={idx} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between text-slate-900 font-medium hover:bg-slate-50 transition-colors">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-lg"></div>
                <span className="text-white font-semibold">PINFLOW</span>
              </div>
              <p className="text-sm leading-relaxed">Automate your Pinterest marketing and grow your business effortlessly.</p>
            </div>
            
            {[
              {
                title: 'Product',
                links: [
                  { name: 'Features', href: '#features' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'FAQ', href: '#faq' },
                ],
              },
              {
                title: 'Company',
                links: [
                  { name: 'About', href: '#' },
                  { name: 'Blog', href: '#' },
                  { name: 'Contact', href: 'mailto:support@arjumedia.com' },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { name: 'Privacy', href: '/privacy' },
                  { name: 'Terms', href: '/terms' },
                  { name: 'Security', href: '#' },
                ],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2 text-sm">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="hover:text-white transition-colors">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 Pinflow. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-slate-700">•</span>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}