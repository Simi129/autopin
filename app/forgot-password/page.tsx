'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Mail } from 'lucide-react';
import Logo from '@/components/shared/Logo';
import Alert from '@/components/shared/Alert';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess('Password reset link has been sent to your email! Check your inbox.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to login</span>
        </button>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          {/* Logo */}
          <div className="mb-8">
            <Logo size="md" />
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Forgot your password?
            </h1>
            <p className="text-slate-500">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6">
              <Alert 
                variant="error" 
                message={error}
                onClose={() => setError(null)}
                autoClose
              />
            </div>
          )}
          {success && (
            <div className="mb-6">
              <Alert 
                variant="success" 
                title="Email sent!"
                message={success}
                onClose={() => setSuccess(null)}
              />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Remember your password?{' '}
            <Link
              href="/login"
              className="text-rose-600 font-medium hover:text-rose-700 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={handleSubmit}
              disabled={loading || !email}
              className="text-rose-600 hover:text-rose-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}