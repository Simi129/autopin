'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  TrendingUp,
  Eye,
  Heart,
  MousePointerClick,
  Loader2,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  Info
} from 'lucide-react';
import { getAccountAnalytics, getPinterestStatus, getBoards } from '@/lib/api';
import { AccountAnalytics, PinterestBoard } from '@/lib/types';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  trend: number[];
  color: string;
}

interface ChartDataPoint {
  date: string;
  impressions: number;
  saves: number;
  clicks: number;
  outboundClicks: number;
}

const COLORS = ['#e11d48', '#f97316', '#f59e0b', '#84cc16'];
const PERIOD_OPTIONS = [
  { value: 7, label: '7 Days' },
  { value: 30, label: '30 Days' },
  { value: 60, label: '60 Days' },
  { value: 90, label: '90 Days' },
];

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null);
  const [analytics, setAnalytics] = useState<AccountAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pinterestConnected, setPinterestConnected] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [boards, setBoards] = useState<PinterestBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>('all');

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && pinterestConnected) {
      loadAnalytics(selectedPeriod);
      loadBoards();
    }
  }, [user, pinterestConnected, selectedPeriod]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      
      try {
        const status = await getPinterestStatus(user.id);
        setPinterestConnected(status.connected);
      } catch (error) {
        console.error('Error checking Pinterest status:', error);
      }
    }
    setLoading(false);
  };

  const loadBoards = async () => {
    if (!user) return;
    
    try {
      const data = await getBoards(user.id);
      setBoards(data.boards || []);
    } catch (error) {
      console.error('Error loading boards:', error);
    }
  };

  const loadAnalytics = async (days: number) => {
    if (!user) return;
    
    setRefreshing(true);
    try {
      const data = await getAccountAnalytics(user.id, days);
      setAnalytics(data);
      
      if (data.analytics && data.analytics.all) {
        processAnalyticsData(data);
        prepareChartData(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const processAnalyticsData = (data: AccountAnalytics) => {
    const metrics = data.analytics.all;
    
    // Calculate totals
    const totals = metrics.reduce((acc, metric) => {
      return {
        impressions: acc.impressions + (metric.metrics.IMPRESSION || 0),
        saves: acc.saves + (metric.metrics.SAVE || 0),
        clicks: acc.clicks + (metric.metrics.PIN_CLICK || 0),
        outboundClicks: acc.outboundClicks + (metric.metrics.OUTBOUND_CLICK || 0),
      };
    }, { impressions: 0, saves: 0, clicks: 0, outboundClicks: 0 });

    // Get trends for mini charts (last 7 days)
    const last7Days = metrics.slice(-7);
    const impressionsTrend = last7Days.map(m => m.metrics.IMPRESSION || 0);
    const savesTrend = last7Days.map(m => m.metrics.SAVE || 0);
    const clicksTrend = last7Days.map(m => m.metrics.PIN_CLICK || 0);
    const outboundTrend = last7Days.map(m => m.metrics.OUTBOUND_CLICK || 0);

    // Calculate changes (compare first half vs second half)
    const halfPoint = Math.floor(metrics.length / 2);
    const firstHalf = metrics.slice(0, halfPoint);
    const secondHalf = metrics.slice(halfPoint);

    const calcChange = (first: any[], second: any[], key: string) => {
      const firstSum = first.reduce((sum, m) => sum + (m.metrics[key] || 0), 0);
      const secondSum = second.reduce((sum, m) => sum + (m.metrics[key] || 0), 0);
      if (firstSum === 0) return secondSum > 0 ? 100 : 0;
      return ((secondSum - firstSum) / firstSum) * 100;
    };

    const impressionsChange = calcChange(firstHalf, secondHalf, 'IMPRESSION');
    const savesChange = calcChange(firstHalf, secondHalf, 'SAVE');
    const clicksChange = calcChange(firstHalf, secondHalf, 'PIN_CLICK');
    const outboundChange = calcChange(firstHalf, secondHalf, 'OUTBOUND_CLICK');

    setStats([
      {
        icon: <Eye className="w-5 h-5" />,
        label: 'Total Impressions',
        value: formatNumber(totals.impressions),
        change: `${impressionsChange > 0 ? '+' : ''}${impressionsChange.toFixed(1)}%`,
        isPositive: impressionsChange >= 0,
        trend: impressionsTrend,
        color: 'rose',
      },
      {
        icon: <Heart className="w-5 h-5" />,
        label: 'Total Saves',
        value: formatNumber(totals.saves),
        change: `${savesChange > 0 ? '+' : ''}${savesChange.toFixed(1)}%`,
        isPositive: savesChange >= 0,
        trend: savesTrend,
        color: 'orange',
      },
      {
        icon: <MousePointerClick className="w-5 h-5" />,
        label: 'Pin Clicks',
        value: formatNumber(totals.clicks),
        change: `${clicksChange > 0 ? '+' : ''}${clicksChange.toFixed(1)}%`,
        isPositive: clicksChange >= 0,
        trend: clicksTrend,
        color: 'amber',
      },
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: 'Outbound Clicks',
        value: formatNumber(totals.outboundClicks),
        change: `${outboundChange > 0 ? '+' : ''}${outboundChange.toFixed(1)}%`,
        isPositive: outboundChange >= 0,
        trend: outboundTrend,
        color: 'lime',
      },
    ]);
  };

  const prepareChartData = (data: AccountAnalytics) => {
    const formatted = data.analytics.all.map(metric => ({
      date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: metric.metrics.IMPRESSION || 0,
      saves: metric.metrics.SAVE || 0,
      clicks: metric.metrics.PIN_CLICK || 0,
      outboundClicks: metric.metrics.OUTBOUND_CLICK || 0,
    }));
    setChartData(formatted);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const exportToCSV = () => {
    if (!chartData.length) return;

    const headers = ['Date', 'Impressions', 'Saves', 'Clicks', 'Outbound Clicks'];
    const rows = chartData.map(d => [d.date, d.impressions, d.saves, d.clicks, d.outboundClicks]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinterest-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Mini chart component
  const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data, 1);
    const colorClass = `bg-${color}-200`;
    
    return (
      <div className="flex items-end gap-0.5 h-8">
        {data.map((value, idx) => (
          <div
            key={idx}
            className={`flex-1 ${colorClass} rounded-t transition-all`}
            style={{ height: `${(value / max) * 100}%`, minHeight: '2px' }}
          />
        ))}
      </div>
    );
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-slate-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.name}:</span>
              <span className="font-semibold text-slate-900">{formatNumber(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
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
          {analytics && (
            <span className="text-sm text-slate-500">
              {analytics.period.start_date} - {analytics.period.end_date}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {PERIOD_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => loadAnalytics(selectedPeriod)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
          >
            <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
          <button
            onClick={exportToCSV}
            disabled={!chartData.length}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export CSV</span>
          </button>
        </div>
      </header>

      <div className="p-8">
        {!pinterestConnected ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Pinterest Not Connected
            </h2>
            <p className="text-slate-600 mb-6 text-center max-w-md">
              Connect your Pinterest account to view analytics and insights about your pins performance.
            </p>
            <a
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Connect Pinterest
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
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-xs font-semibold ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-slate-500 mb-4">{stat.label}</p>
                  <MiniChart data={stat.trend} color={stat.color} />
                </div>
              ))}
            </div>

            {/* Main Line Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Performance Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    stroke="#cbd5e1"
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    stroke="#cbd5e1"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '14px' }}
                    iconType="circle"
                  />
                  <Line
                    type="monotone"
                    dataKey="impressions"
                    stroke="#e11d48"
                    strokeWidth={2}
                    dot={{ fill: '#e11d48', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Impressions"
                  />
                  <Line
                    type="monotone"
                    dataKey="saves"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ fill: '#f97316', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Saves"
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Clicks"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Area Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Cumulative Engagement</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      stroke="#cbd5e1"
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      stroke="#cbd5e1"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="saves"
                      stackId="1"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.6}
                      name="Saves"
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                      name="Clicks"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Engagement Distribution</h3>
                {analytics && (() => {
                  const totals = analytics.analytics.all.reduce((acc, m) => ({
                    clicks: acc.clicks + (m.metrics.PIN_CLICK || 0),
                    saves: acc.saves + (m.metrics.SAVE || 0),
                    outbound: acc.outbound + (m.metrics.OUTBOUND_CLICK || 0),
                  }), { clicks: 0, saves: 0, outbound: 0 });

                  const pieData = [
                    { name: 'Pin Clicks', value: totals.clicks },
                    { name: 'Saves', value: totals.saves },
                    { name: 'Outbound Clicks', value: totals.outbound },
                  ].filter(item => item.value > 0);

                  return pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-slate-500">
                      No engagement data available
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Metrics</h3>
                <div className="space-y-4">
                  {stats.length > 0 && [
                    {
                      label: 'Best performer',
                      value: stats.reduce((best, curr) =>
                        parseFloat(curr.change) > parseFloat(best.change) ? curr : best
                      ).label,
                    },
                    {
                      label: 'Avg. daily impressions',
                      value: analytics ? formatNumber(
                        analytics.analytics.all.reduce((sum, m) => sum + (m.metrics.IMPRESSION || 0), 0) /
                        analytics.analytics.all.length
                      ) : '0',
                    },
                    {
                      label: 'Total engagement',
                      value: analytics ? formatNumber(
                        analytics.analytics.all.reduce((sum, m) =>
                          sum + (m.metrics.PIN_CLICK || 0) + (m.metrics.SAVE || 0) + (m.metrics.OUTBOUND_CLICK || 0), 0
                        )
                      ) : '0',
                    },
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">{metric.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Engagement Rate</h3>
                <div className="space-y-4">
                  {analytics && (() => {
                    const totals = analytics.analytics.all.reduce((acc, m) => ({
                      impressions: acc.impressions + (m.metrics.IMPRESSION || 0),
                      engagement: acc.engagement + (m.metrics.PIN_CLICK || 0) + (m.metrics.SAVE || 0),
                    }), { impressions: 0, engagement: 0 });

                    const engagementRate = totals.impressions > 0
                      ? (totals.engagement / totals.impressions) * 100
                      : 0;

                    const saveRate = totals.impressions > 0
                      ? (analytics.analytics.all.reduce((sum, m) => sum + (m.metrics.SAVE || 0), 0) / totals.impressions) * 100
                      : 0;

                    const clickRate = totals.impressions > 0
                      ? (analytics.analytics.all.reduce((sum, m) => sum + (m.metrics.PIN_CLICK || 0), 0) / totals.impressions) * 100
                      : 0;

                    return [
                      { label: 'Overall rate', value: `${engagementRate.toFixed(2)}%`, color: 'rose' },
                      { label: 'Save rate', value: `${saveRate.toFixed(2)}%`, color: 'orange' },
                      { label: 'Click rate', value: `${clickRate.toFixed(2)}%`, color: 'amber' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm text-slate-600">{item.label}</span>
                        <span className={`text-sm font-semibold text-${item.color}-600`}>{item.value}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Period Summary</h3>
                <div className="space-y-4">
                  {analytics && [
                    {
                      label: 'Days tracked',
                      value: analytics.analytics.all.length.toString(),
                    },
                    {
                      label: 'Start date',
                      value: analytics.period.start_date,
                    },
                    {
                      label: 'End date',
                      value: analytics.period.end_date,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-900">{item.value}</span>
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