'use client';

import { useEffect, useState } from 'react';
import { useViewStore } from '@/hooks/useViewSwitcher';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/types';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import Logo from '@/components/shared/Logo';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function DashboardView() {
  const { setView } = useViewStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({
        id: user.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
      });
      setLoading(false);
    } else {
      setView('auth');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner message="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 px-6 flex items-center border-b border-slate-200">
          <Logo size="md" />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { icon: <BarChart3 size={18} />, label: 'Dashboard', active: true },
            { icon: <Calendar size={18} />, label: 'Schedule', active: false },
            { icon: <TrendingUp size={18} />, label: 'Analytics', active: false },
            { icon: <Users size={18} />, label: 'Audience', active: false },
            { icon: <Settings size={18} />, label: 'Settings', active: false },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-semibold">
              {user?.full_name?.charAt(0) || user?.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search pins, boards, analytics..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <button className="h-9 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Plus size={16} />
              Create Pin
            </button>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Welcome back, {user?.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p className="text-slate-500">Here&apos;s what&apos;s happening with your Pinterest account today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: <Eye className="w-5 h-5" />, label: 'Total Views', value: '12.5K', change: '+12.3%', up: true },
              { icon: <Heart className="w-5 h-5" />, label: 'Engagements', value: '3.2K', change: '+8.1%', up: true },
              { icon: <Users className="w-5 h-5" />, label: 'Followers', value: '1.8K', change: '+5.2%', up: true },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Pins Created', value: '145', change: '+23%', up: true },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">Performance Overview</h3>
                <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-rose-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-2 h-64">
                  {[40, 70, 55, 80, 45, 65, 90].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col justify-end">
                      <div 
                        className="bg-gradient-to-t from-rose-500 to-orange-400 rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-slate-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <span key={idx}>{day}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">Upcoming Posts</h3>
                <button className="text-xs text-rose-600 font-medium hover:text-rose-700">View All</button>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: 'Spring Garden Ideas', time: 'Today, 3:00 PM', status: 'scheduled' },
                  { title: 'Top 10 DIY Hacks', time: 'Tomorrow, 9:00 AM', status: 'scheduled' },
                  { title: 'Healthy Meal Prep', time: 'Wed, 12:30 PM', status: 'draft' },
                ].map((post, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all group cursor-pointer">
                    <div className="w-12 h-12 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-rose-200 to-orange-200"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{post.title}</p>
                      <p className="text-xs text-slate-500">{post.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${post.status === 'scheduled' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  View Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
              <button className="text-xs text-rose-600 font-medium hover:text-rose-700">Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-xs text-slate-500 font-medium">
                    <th className="px-6 py-3 font-medium">Pin</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Board</th>
                    <th className="px-6 py-3 font-medium">Engagement</th>
                    <th className="px-6 py-3 font-medium text-right">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                  {[
                    { title: 'Modern Living Room', status: 'Published', board: 'Home Decor', views: '1.2k views', date: '2h ago', statusColor: 'emerald' },
                    { title: 'Minimalist Workspace', status: 'Published', board: 'Office Setup', views: '850 views', date: '5h ago', statusColor: 'emerald' },
                    { title: 'Recipe: Vegan Pasta', status: 'Pending', board: 'Food & Drink', views: '-', date: 'Scheduled', statusColor: 'amber' },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-rose-200 to-orange-200"></div>
                        <span className="font-medium text-slate-900">{item.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${item.statusColor}-50 text-${item.statusColor}-700`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.board}</td>
                      <td className="px-6 py-4">{item.views}</td>
                      <td className="px-6 py-4 text-right text-slate-400">{item.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                          <MoreHorizontal size={18} className="text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}