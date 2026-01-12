'use client';

import { Shield, Lock, Eye, Database, Users, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to home</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white mb-6">
            <Shield size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Your privacy is important to us
          </p>
          <p className="text-sm text-slate-500">
            Last updated: January 12, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 space-y-10">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">
              At Pinflow, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our Pinterest automation service.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Database size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  1. Information We Collect
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    We collect information you provide directly to us when you create an account, 
                    connect your Pinterest account, and use our service to schedule and publish pins.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="font-medium text-slate-900 mb-2">This includes:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Account information (name, email address)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Pinterest account connection data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Content you create or upload (pins, images, descriptions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Usage data and analytics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Eye size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  2. How We Use Your Information
                </h2>
                <p className="text-slate-600 mb-3">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                    <span>Provide, maintain, and improve our services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                    <span>Schedule and publish pins to your Pinterest account as instructed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                    <span>Send you technical notices, updates, and support messages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                    <span>Monitor and analyze trends, usage, and activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                    <span>Detect, prevent, and address technical issues</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm5 7h-4V5h-2v4H7v2h4v4h2v-4h4V9z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  3. Pinterest Integration
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    When you connect your Pinterest account, we access your Pinterest data through 
                    the official Pinterest API. We take this access seriously and implement strict 
                    security measures.
                  </p>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-5 border border-orange-200">
                    <p className="font-semibold text-slate-900 mb-2">What we access:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Your Pinterest boards and pins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Basic account information (username, profile picture)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Analytics data for your pins and boards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Permission to create and schedule pins</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Lock size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  4. Data Security
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    We use industry-standard security measures to protect your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Encryption</p>
                      <p className="text-xs text-slate-600">All data transmitted is encrypted using SSL/TLS</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Secure Storage</p>
                      <p className="text-xs text-slate-600">Data stored in secure, encrypted databases</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Access Control</p>
                      <p className="text-xs text-slate-600">Limited access to personal information</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Regular Audits</p>
                      <p className="text-xs text-slate-600">Continuous security monitoring and updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Users size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  5. Data Sharing
                </h2>
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                      <Shield size={16} />
                    </div>
                    <p className="font-medium text-emerald-900 text-sm">
                      We do not sell your personal information. Period.
                    </p>
                  </div>
                  <p>
                    We only share your information in the following limited circumstances:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>With Pinterest:</strong> To provide our core service of scheduling and publishing pins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Service Providers:</strong> Trusted partners who help us operate our service (e.g., hosting, analytics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  6. Your Rights & Control
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    You have full control over your personal information. You have the right to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-orange-200 transition-colors">
                      <p className="font-medium text-slate-900 text-sm mb-1">Access Your Data</p>
                      <p className="text-xs text-slate-600">View all personal information we store</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-orange-200 transition-colors">
                      <p className="font-medium text-slate-900 text-sm mb-1">Update Information</p>
                      <p className="text-xs text-slate-600">Modify your account details anytime</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-orange-200 transition-colors">
                      <p className="font-medium text-slate-900 text-sm mb-1">Delete Your Account</p>
                      <p className="text-xs text-slate-600">Permanently remove all your data</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg hover:border-orange-200 transition-colors">
                      <p className="font-medium text-slate-900 text-sm mb-1">Export Your Data</p>
                      <p className="text-xs text-slate-600">Download all your information</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    You can exercise these rights at any time through your account settings 
                    or by contacting us directly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  7. Contact Us
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please don't hesitate to contact us:
                  </p>
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">
                      <strong className="text-slate-900">Email:</strong>
                    </p>
                    <a 
                      href="mailto:support@arjumedia.com" 
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      <Mail size={18} />
                      support@arjumedia.com
                    </a>
                    <p className="text-xs text-slate-500 mt-4">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Changes to This Privacy Policy
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              updated" date. We encourage you to review this Privacy Policy periodically for 
              any changes. Changes to this Privacy Policy are effective when they are posted 
              on this page.
            </p>
          </section>

        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-3">
            Ready to automate your Pinterest?
          </h3>
          <p className="text-slate-300 mb-6">
            Join thousands of creators using Pinflow
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
          >
            Get Started Free
            <ArrowLeft size={16} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}