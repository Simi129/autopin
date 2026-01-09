'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { connectPinterest, getPinterestStatus, disconnectPinterest } from '@/lib/api';
import { Link2, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function PinterestConnect() {
  const [user, setUser] = useState<any>(null);
  const [pinterestStatus, setPinterestStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    console.time('⏱️ PinterestConnect: Total loading time');
    console.time('⏱️ PinterestConnect: Getting user');
    
    const { data: { user } } = await supabase.auth.getUser();
    console.timeEnd('⏱️ PinterestConnect: Getting user');
    
    if (user) {
      setUser(user);
      await checkPinterestStatus(user.id);
    }
    
    setLoading(false);
    console.timeEnd('⏱️ PinterestConnect: Total loading time');
  };

  const checkPinterestStatus = async (userId: string) => {
    console.time('⏱️ PinterestConnect: API call getPinterestStatus');
    
    try {
      const status = await getPinterestStatus(userId);
      console.timeEnd('⏱️ PinterestConnect: API call getPinterestStatus');
      console.log('✅ Pinterest status:', status);
      setPinterestStatus(status);
    } catch (error) {
      console.timeEnd('⏱️ PinterestConnect: API call getPinterestStatus');
      console.error('❌ Error checking Pinterest status:', error);
      setError('Failed to load Pinterest connection status');
      // Устанавливаем дефолтное состояние при ошибке
      setPinterestStatus({ connected: false });
    }
  };

  const handleConnect = () => {
    if (user) {
      connectPinterest(user.id);
    }
  };

  const handleDisconnect = async () => {
    if (!user) return;
    
    setDisconnecting(true);
    try {
      await disconnectPinterest(user.id);
      setPinterestStatus({ connected: false });
    } catch (error) {
      console.error('Error disconnecting Pinterest:', error);
      alert('Failed to disconnect Pinterest');
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-slate-200">
        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        <span className="ml-2 text-sm text-slate-500">Loading Pinterest connection...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-red-900">Connection Error</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                checkUser();
              }}
              className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Pinterest Account</h3>
            {pinterestStatus?.connected ? (
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">
                  Connected as <span className="font-medium">@{pinterestStatus.pinterest_username}</span>
                </span>
              </div>
            ) : (
              <p className="text-sm text-slate-500 mt-1">Connect your Pinterest account to start scheduling pins</p>
            )}
          </div>
        </div>

        {pinterestStatus?.connected ? (
          <button
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {disconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
          >
            <Link2 className="w-4 h-4" />
            Connect Pinterest
          </button>
        )}
      </div>

      {!pinterestStatus?.connected && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600">
            ℹ️ You'll be redirected to Pinterest to authorize access. We only request permissions to create pins and view your boards.
          </p>
        </div>
      )}
    </div>
  );
}