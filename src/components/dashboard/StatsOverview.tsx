import { Banknote, Users, TrendingUp, ShoppingCart, Star, MapPin, Calendar, Clock, CalendarDays, CalendarRange, CalendarCheck, Activity, Target, BarChart3, PieChart as PieChartIcon, Settings } from "lucide-react";
import { ResponsiveContainer } from 'recharts';
import { useState } from "react";

interface StatsOverviewProps {
  stats: {
    totalRevenue: number;
    totalUsers: number;
    conversionRate: number;
    avgOrderValue: number;
    totalReviews: number;
    reviewsByStatus: { [status: string]: number };
    revenueByStatus: { [status: string]: number };
    acquisitionChannels: { [channel: string]: string };
    natureBooking: { [nature: string]: string };
    locationData: { name: string; value: number; percentage: number; color: string }[];
    acquisitionPieData: { name: string; value: number; percentage: number; color: string }[];
    naturePieData: { name: string; value: number; percentage: number; color: string }[];
  };
  dateRange?: { start: string; end: string };
  onTimePeriodChange?: (period: string) => void;
  currentPeriod?: string;
}

export function StatsOverview({ stats, dateRange, onTimePeriodChange, currentPeriod }: StatsOverviewProps) {
  const getDateDisplayText = () => {
    switch (currentPeriod) {
      case 'today':
        return `Showing today's data (${new Date().toLocaleDateString()})`;
      case 'this-month':
        return `Showing this month's data (${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`;
      case 'last-month':
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return `Showing last month's data (${lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`;
      case 'this-year':
        return `Showing this year's data (${new Date().getFullYear()})`;
      case 'all':
        return dateRange?.start && dateRange?.end 
          ? `Data From ${new Date(dateRange.start).toLocaleDateString()} and To ${new Date(dateRange.end).toLocaleDateString()}`
          : "Showing all data";
      default:
        return dateRange?.start && dateRange?.end 
          ? `Data showing from Date ${new Date(dateRange.start).toLocaleDateString()} and To ${new Date(dateRange.end).toLocaleDateString()} (${Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24))} days)`
          : "Data showing from Date 5/5/2025 and To 8/3/2025 (90 days)";
    }
  };

  const handleTimePeriodChange = (period: string) => {
    if (onTimePeriodChange) {
      onTimePeriodChange(period);
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `${stats.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Banknote,
      gradient: "bg-gradient-primary",
      glow: "glow-primary"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Regular stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const isRevenue = stat.title === "Total Revenue";
          const isRevenueByStatus = stat.title === "Revenue by Booking Status";
          const isClients = stat.title === "Total Clients";
          const isLocation = stat.title === "Location Distribution";
          
          if (isRevenue) {
            // Beautiful KPI Dashboard card
            return (
              <div
                key={stat.title}
                className="xl:col-span-2 glass rounded-2xl p-8 hover-lift relative overflow-hidden group glow-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Enhanced background with multiple gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary/15" />
                
                {/* Animated background particles */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse" />
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-radial from-primary/15 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-gradient-primary shadow-lg shadow-primary/25">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text">
                          Key Performance Indicators
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getDateDisplayText()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Time period buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleTimePeriodChange('today')}
                          data-tooltip="Today"
                          className="relative p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-300 tooltip-trigger"
                        >
                          <Calendar className="w-4 h-4 text-primary" />
                        </button>
                        
                        <button
                          onClick={() => handleTimePeriodChange('this-month')}
                          data-tooltip="This Month"
                          className="relative p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-300 tooltip-trigger"
                        >
                          <CalendarDays className="w-4 h-4 text-primary" />
                        </button>
                        
                        <button
                          onClick={() => handleTimePeriodChange('last-month')}
                          data-tooltip="Last Month"
                          className="relative p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-300 tooltip-trigger"
                        >
                          <CalendarRange className="w-4 h-4 text-primary" />
                        </button>
                        
                        <button
                          onClick={() => handleTimePeriodChange('this-year')}
                          data-tooltip="This Year"
                          className="relative p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-300 tooltip-trigger"
                        >
                          <CalendarCheck className="w-4 h-4 text-primary" />
                        </button>
                        
                        <button
                          onClick={() => handleTimePeriodChange('all')}
                          data-tooltip="All"
                          className="relative p-2 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-all duration-300 tooltip-trigger"
                        >
                          <Clock className="w-4 h-4 text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Total Revenue */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                          <Banknote className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-green-400 transition-colors">
                        {stats.totalRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">SAR</p>
                    </div>

                    {/* Unique Clients */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Unique Clients</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                        {stats.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Customers</p>
                    </div>

                    {/* Total Locations */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Total Locations</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
                        {stats.locationData.length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Branches</p>
                    </div>

                    {/* Total Acquisition Channels */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Acquisition Channels</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-orange-400 transition-colors">
                        {stats.acquisitionPieData.length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Channels</p>
                    </div>

                    {/* Total Booking Types */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Booking Types</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-pink-400 transition-colors">
                        {stats.naturePieData.length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Types</p>
                    </div>
                  </div>

                  {/* Additional KPI Grid - Second Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
                    {/* KPI 6 */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">KPI 6</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                        1,234
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Units</p>
                    </div>

                    {/* KPI 7 */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">KPI 7</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-teal-400 transition-colors">
                        567
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Items</p>
                    </div>

                    {/* KPI 8 */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">KPI 8</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                        890
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Metrics</p>
                    </div>

                    {/* KPI 9 */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                          <PieChartIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">KPI 9</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                        432
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Data</p>
                    </div>

                    {/* KPI 10 */}
                    <div className="flex flex-col p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">KPI 10</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground group-hover:text-violet-400 transition-colors">
                        765
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Config</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1500 bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ animationDelay: '0.3s' }} />
              </div>
            );
          }

          if (isRevenueByStatus) {
            // Revenue by Booking Status pie chart card
            const revenueByStatusData = Object.entries(stats.revenueByStatus).map(([status, revenue], index) => ({
              name: status,
              value: revenue,
              percentage: Math.round(((revenue as number) / stats.totalRevenue) * 100 * 100) / 100,
              color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1'][index % 6]
            })).sort((a, b) => b.value - a.value);

            
          }

          if (isClients) {
            // Special design for Total Clients card
            return (
              <div
                key={stat.title}
                className="glass rounded-2xl p-6 hover-lift relative overflow-hidden group glow-secondary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Enhanced background with gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-secondary/5 to-secondary/15" />
                
                {/* Animated background particles */}
                <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-radial from-secondary/15 to-transparent rounded-full animate-pulse" />
                <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-radial from-secondary/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-secondary shadow-lg shadow-secondary/25">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-secondary bg-clip-text">
                      {stat.value}
                    </p>
                  </div>
                </div>

                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
                <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1500 bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ animationDelay: '0.4s' }} />
              </div>
            );
          }

          // Regular design for other cards
          return (
            <div
              key={stat.title}
              className={`glass rounded-xl p-6 hover-lift relative overflow-hidden group ${stat.glow}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 opacity-5 ${stat.gradient}`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.gradient} bg-opacity-20`}>
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.changeType === "positive"
                        ? "text-accent bg-accent/10"
                        : "text-destructive bg-destructive/10"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  {'breakdown' in stat && stat.breakdown && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {String(stat.breakdown)}
                    </p>
                  )}
                </div>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Pie Charts Section removed */}
    </div>
  );
}