'use client';

import { FileText, AlertCircle, Shield, Zap, XCircle, RefreshCw, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
            <FileText size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Please read these terms carefully
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
              Welcome to Pinflow! These Terms of Service govern your use of our Pinterest automation 
              and scheduling platform. By accessing or using Pinflow, you agree to be bound by these terms.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    By creating an account and using Pinflow, you accept and agree to be bound by 
                    these Terms of Service and our Privacy Policy. If you do not agree to these 
                    terms, please do not use our service.
                  </p>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                    <p className="text-sm">
                      <strong className="text-slate-900">Important:</strong> You must be at least 
                      18 years old to use Pinflow. By using our service, you represent that you 
                      meet this age requirement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Zap size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  2. Description of Service
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    Pinflow is a Pinterest automation platform that allows you to:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Schedule Pins</p>
                      <p className="text-xs text-slate-600">Plan and automatically publish pins at optimal times</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Content Management</p>
                      <p className="text-xs text-slate-600">Organize and manage your Pinterest content</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Analytics</p>
                      <p className="text-xs text-slate-600">Track performance and optimize your strategy</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 text-sm mb-1">Automation</p>
                      <p className="text-xs text-slate-600">AI-powered content suggestions and scheduling</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    We continuously improve and update our service. Features may change, and new 
                    features may be added over time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  3. User Responsibilities
                </h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    When using Pinflow, you agree to the following responsibilities:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Provide Accurate Information</p>
                        <p className="text-sm">You must provide accurate and complete information when creating your account and keep it up to date.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Maintain Account Security</p>
                        <p className="text-sm">You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Comply with Pinterest's Terms</p>
                        <p className="text-sm">You must comply with Pinterest's Terms of Service and Community Guidelines when using our service.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <p className="font-medium text-slate-900 mb-1">Use Service Appropriately</p>
                        <p className="text-sm">You may not use our service for any illegal or unauthorized purpose, including spamming or violating intellectual property rights.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Shield size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  4. Prohibited Activities
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    You may not use Pinflow to:
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Violate any laws or regulations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Infringe on intellectual property rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Distribute spam, malware, or harmful content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Attempt to gain unauthorized access to our systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Resell or redistribute our service without permission</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span>Use automated tools to scrape or harvest data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  5. Intellectual Property
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    All content, features, and functionality of Pinflow are owned by us and are 
                    protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm mb-1">Your Content</p>
                      <p className="text-xs text-slate-600">
                        You retain all rights to the content you create and upload. By using 
                        our service, you grant us permission to store and display your content.
                      </p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm mb-1">Our Platform</p>
                      <p className="text-xs text-slate-600">
                        You may not copy, modify, distribute, or create derivative works from 
                        our platform without written permission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <XCircle size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  6. Termination
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    We reserve the right to suspend or terminate your account at any time for 
                    violations of these terms or any reason we deem appropriate.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm mb-2">You may terminate:</p>
                      <p className="text-xs text-slate-600">
                        You can cancel your account at any time through your account settings. 
                        No questions asked.
                      </p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <p className="font-medium text-slate-900 text-sm mb-2">We may terminate:</p>
                      <p className="text-xs text-slate-600">
                        We may suspend or terminate accounts that violate our terms, with or 
                        without notice.
                      </p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      <strong>Note:</strong> Upon termination, you will lose access to your 
                      account and any scheduled pins. Make sure to export your data before 
                      canceling if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <RefreshCw size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  7. Changes to Terms
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    We may modify these Terms of Service at any time. When we do, we will:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                      <span>Update the "Last updated" date at the top of this page</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                      <span>Notify you via email if the changes are significant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">✓</span>
                      <span>Post a notice in the Pinflow dashboard</span>
                    </li>
                  </ul>
                  <p className="text-sm">
                    Your continued use of Pinflow after changes are posted constitutes your 
                    acceptance of the updated terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  8. Contact Us
                </h2>
                <div className="space-y-3 text-slate-600">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">
                      <strong className="text-slate-900">Email Support:</strong>
                    </p>
                    <a 
                      href="mailto:support@arjumedia.com" 
                      className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      <Mail size={18} />
                      support@arjumedia.com
                    </a>
                    <p className="text-xs text-slate-500 mt-4">
                      Our team typically responds within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Governing Law
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws. 
              Any disputes arising from these terms or your use of Pinflow shall be resolved 
              through binding arbitration, except where prohibited by law.
            </p>
          </section>

        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-3">
            Ready to get started?
          </h3>
          <p className="text-slate-300 mb-6">
            Join Pinflow and automate your Pinterest workflow today
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
          >
            Create Free Account
            <ArrowLeft size={16} className="rotate-180" />
          </button>
          <p className="text-xs text-slate-400 mt-4">
            No credit card required • 100% free until Feb 1, 2026
          </p>
        </div>
      </div>
    </div>
  );
}