'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Eye, Heart, MessageCircle, Loader2, Calendar, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getAccountAnalytics, getPinterestStatus } from '@/lib/api';
import { AccountAnalytics } from '@/lib/types';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  trend: number[];
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<AccountAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [pinterestConnected, setPinterestConnected] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && pinterestConnected) {
      loadAnalytics(selectedPeriod);
    }
  }, [user, pinterestConnected, selectedPeriod]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      
      // Проверяем подключение Pinterest
      try {
        const status = await getPinterestStatus(user.id);
        setPinterestConnected(status.connected);
      } catch (error) {
        console.error('Error checking Pinterest status:', error);
      }
    }
    setLoading(false);
  };

  const loadAnalytics = async (days: number) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await getAccountAnalytics(user.id, days);
      setAnalytics(data);
      
      if (data.analytics && data.analytics.all) {
        processAnalyticsData(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (data: AccountAnalytics) => {
    const metrics = data.analytics.all;
    
    // Суммируем общие метрики
    const totals = metrics.reduce((acc, metric) => {
      return {
        impressions: acc.impressions + (metric.metrics.IMPRESSION || 0),
        saves: acc.saves + (metric.metrics.SAVE || 0),
        clicks: acc.clicks + (metric.metrics.PIN_CLICK || 0),
        outboundClicks: acc.outboundClicks + (metric.metrics.OUTBOUND_CLICK || 0),
      };
    }, { impressions: 0, saves: 0, clicks: 0, outboundClicks: 0 });

    // Получаем тренды для мини-графиков (последние 7 дней)
    const last7Days = metrics.slice(-7);
    const impressionsTrend = last7Days.map(m => m.metrics.IMPRESSION || 0);
    const savesTrend = last7Days.map(m => m.metrics.SAVE || 0);
    const clicksTrend = last7Days.map(m => m.metrics.PIN_CLICK || 0);
    const engagementTrend = last7Days.map(m => 
      (m.metrics.PIN_CLICK || 0) + (m.metrics.SAVE || 0) + (m.metrics.OUTBOUND_CLICK || 0)
    );

    // Рассчитываем изменения (сравниваем первую и вторую половину периода)
    const halfPoint = Math.floor(metrics.length / 2);
    const firstHalf = metrics.slice(0, halfPoint);
    const secondHalf = metrics.slice(halfPoint);

    const calcChange = (first: any[], second: any[], key: string) => {
      const firstSum = first.reduce((sum, m) => sum + (m.metrics[key] || 0), 0);
      const secondSum = second.reduce((sum, m) => sum + (m.metrics[key] || 0), 0);
      if (firstSum === 0) return 0;
      return ((secondSum - firstSum) / firstSum) * 100;
    };

    const impressionsChange = calcChange(firstHalf, secondHalf, 'IMPRESSION');
    const savesChange = calcChange(firstHalf, secondHalf, 'SAVE');
    const clicksChange = calcChange(firstHalf, secondHalf, 'PIN_CLICK');
    
    const totalEngagement = totals.clicks + totals.saves + totals.outboundClicks;
    const engagementChange = (impressionsChange + savesChange + clicksChange) / 3;

    setStats([
      {
        icon: <Eye className="w-5 h-5" />,
        label: 'Total Views',
        value: formatNumber(totals.impressions),
        change: `${impressionsChange > 0 ? '+' : ''}${impressionsChange.toFixed(1)}%`,
        isPositive: impressionsChange >= 0,
        trend: impressionsTrend,
      },
      {
        icon: <Heart className="w-5 h-5" />,
        label: 'Total Saves',
        value: formatNumber(totals.saves),
        change: `${savesChange > 0 ? '+' : ''}${savesChange.toFixed(1)}%`,
        isPositive: savesChange >= 0,
        trend: savesTrend,
      },
      {
        icon: <MessageCircle className="w-5 h-5" />,
        label: 'Total Clicks',
        value: formatNumber(totals.clicks),
        change: `${clicksChange > 0 ? '+' : ''}${clicksChange.toFixed(1)}%`,
        isPositive: clicksChange >= 0,
        trend: clicksTrend,
      },
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: 'Engagement',
        value: formatNumber(totalEngagement),
        change: `${engagementChange > 0 ? '+' : ''}${engagementChange.toFixed(1)}%`,
        isPositive: engagementChange >= 0,
        trend: engagementTrend,
      },
    ]);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Компонент мини-графика
  const MiniChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data, 1);
    return (
      <div className="flex items-end gap-0.5 h-8">
        {data.map((value, idx) => (
          <div
            key={idx}
            className="flex-1 bg-rose-200 rounded-t"
            style={{ height: `${(value / max) * 100}%`, minHeight: '2px' }}
          />
        ))}
      </div>
    );
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-slate-900">Analytics</h1>
          {pinterestConnected && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>
                {analytics?.period.start_date} to {analytics?.period.end_date}
              </span>
            </div>
          )}
        </div>
        
        {pinterestConnected && (
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
            disabled={loading}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        )}
      </header>

      <div className="p-8">
        {!pinterestConnected ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Connect Pinterest to View Analytics
            </h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              To see detailed analytics about your pins, boards, and audience engagement, 
              please connect your Pinterest account from the dashboard.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Go to Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200" />
                  <div className="w-12 h-4 bg-slate-200 rounded" />
                </div>
                <div className="w-20 h-8 bg-slate-200 rounded mb-2" />
                <div className="w-24 h-4 bg-slate-200 rounded mb-4" />
                <div className="h-8 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-xs font-semibold ${
                        stat.isPositive ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-slate-500 mb-4">{stat.label}</p>
                  <MiniChart data={stat.trend} />
                </div>
              ))}
            </div>

            {/* Detailed Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Over Time</h3>
              
              {analytics && analytics.analytics.all.length > 0 ? (
                <div>
                  <div className="flex items-end gap-2 h-64 mb-4">
                    {analytics.analytics.all.slice(-30).map((metric, idx) => {
                      const value = metric.metrics.IMPRESSION || 0;
                      const max = Math.max(...analytics.analytics.all.map(m => m.metrics.IMPRESSION || 0), 1);
                      const height = (value / max) * 100;
                      
                      return (
                        <div key={idx} className="flex-1 flex flex-col justify-end group">
                          <div 
                            className="bg-gradient-to-t from-rose-500 to-orange-400 rounded-t transition-all hover:opacity-80 relative"
                            style={{ height: `${height}%`, minHeight: '2px' }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {formatNumber(value)}
                              <div className="text-[10px] text-slate-300">
                                {new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{analytics.analytics.all[0]?.date}</span>
                    <span>{analytics.analytics.all[analytics.analytics.all.length - 1]?.date}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  No data available for this period
                </div>
              )}
            </div>

            {/* Metrics Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Breakdown</h3>
                <div className="space-y-4">
                  {analytics && analytics.analytics.all.length > 0 && (() => {
                    const totals = analytics.analytics.all.reduce((acc, m) => ({
                      clicks: acc.clicks + (m.metrics.PIN_CLICK || 0),
                      saves: acc.saves + (m.metrics.SAVE || 0),
                      outbound: acc.outbound + (m.metrics.OUTBOUND_CLICK || 0),
                    }), { clicks: 0, saves: 0, outbound: 0 });
                    
                    const total = totals.clicks + totals.saves + totals.outbound;
                    
                    return [
                      { label: 'Pin Clicks', value: totals.clicks, color: 'bg-rose-500' },
                      { label: 'Saves', value: totals.saves, color: 'bg-orange-500' },
                      { label: 'Outbound Clicks', value: totals.outbound, color: 'bg-amber-500' },
                    ].map((item, idx) => {
                      const percentage = total > 0 ? (item.value / total) * 100 : 0;
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            <span className="text-sm text-slate-500">
                              {formatNumber(item.value)} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  {stats.length > 0 && [
                    {
                      label: 'Best performing metric',
                      value: stats.reduce((best, curr) => 
                        parseFloat(curr.change) > parseFloat(best.change) ? curr : best
                      ).label,
                    },
                    {
                      label: 'Average daily views',
                      value: analytics ? formatNumber(
                        analytics.analytics.all.reduce((sum, m) => sum + (m.metrics.IMPRESSION || 0), 0) / 
                        analytics.analytics.all.length
                      ) : '0',
                    },
                    {
                      label: 'Engagement rate',
                      value: analytics ? (() => {
                        const totals = analytics.analytics.all.reduce((acc, m) => ({
                          impressions: acc.impressions + (m.metrics.IMPRESSION || 0),
                          engagement: acc.engagement + (m.metrics.PIN_CLICK || 0) + (m.metrics.SAVE || 0),
                        }), { impressions: 0, engagement: 0 });
                        return totals.impressions > 0 
                          ? ((totals.engagement / totals.impressions) * 100).toFixed(2) + '%'
                          : '0%';
                      })() : '0%',
                    },
                  ].map((insight, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">{insight.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{insight.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}