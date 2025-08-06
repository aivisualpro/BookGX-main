import { Server, Zap, AlertTriangle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PerformanceIndicatorsProps {
  performance: {
    serverUptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

export function PerformanceIndicators({ performance }: PerformanceIndicatorsProps) {
  const indicators = [
    {
      title: "Payment Success Rate",
      value: `${performance.serverUptime.toFixed(2)}%`,
      percentage: performance.serverUptime,
      icon: Server,
      status: performance.serverUptime >= 95 ? "excellent" : performance.serverUptime >= 85 ? "good" : "warning",
      target: "> 95%"
    },
    {
      title: "Average Order Value",
      value: `${performance.responseTime} SAR`,
      percentage: Math.min(100, (performance.responseTime / 500) * 100),
      icon: Zap,
      status: performance.responseTime >= 300 ? "excellent" : performance.responseTime >= 200 ? "good" : "warning",
      target: "> 250 SAR"
    },
    {
      title: "Cancellation Rate",
      value: `${performance.errorRate.toFixed(2)}%`,
      percentage: Math.max(0, 100 - (performance.errorRate * 2)),
      icon: AlertTriangle,
      status: performance.errorRate <= 5 ? "excellent" : performance.errorRate <= 10 ? "good" : "warning",
      target: "< 5%"
    },
    {
      title: "Up-selling Success",
      value: `${performance.throughput.toFixed(2)}%`,
      percentage: Math.min(100, performance.throughput * 2),
      icon: Activity,
      status: performance.throughput >= 30 ? "excellent" : performance.throughput >= 20 ? "good" : "warning",
      target: "> 25%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-accent";
      case "good": return "text-primary";
      case "warning": return "text-warning";
      default: return "text-destructive";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-accent";
      case "good": return "bg-primary";
      case "warning": return "bg-warning";
      default: return "bg-destructive";
    }
  };

  // Main KPI Cards Data
  const mainKPIs = [
    {
      title: "Total Revenue",
      subtitle: "SAR",
      value: "11,869,721.5",
      icon: "💰",
      gradient: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30",
      textColor: "text-green-400"
    },
    {
      title: "Unique Clients",
      subtitle: "Customers",
      value: "3",
      icon: "👥",
      gradient: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      textColor: "text-blue-400"
    },
    {
      title: "Total Locations",
      subtitle: "Branches",
      value: "6",
      icon: "📍",
      gradient: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      textColor: "text-purple-400"
    },
    {
      title: "Acquisition Channels",
      subtitle: "Channels",
      value: "4",
      icon: "📈",
      gradient: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30",
      textColor: "text-orange-400"
    },
    {
      title: "Booking Types",
      subtitle: "Types",
      value: "3",
      icon: "🛒",
      gradient: "from-pink-500/20 to-pink-600/20",
      border: "border-pink-500/30",
      textColor: "text-pink-400"
    }
  ];

  return (
    <>
      {/* Filter Bar */}
      <div className="w-full mb-6">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">�</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Key Performance Indicators</h3>
                <p className="text-sm text-gray-400">Showing all data</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-sm">�</span>
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-sm">📋</span>
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-sm">📊</span>
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <span className="text-sm">⏰</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main KPI Cards - Full Width Grid */}
      <div className="w-full mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {mainKPIs.map((kpi, index) => (
            <div 
              key={kpi.title}
              className={`glass rounded-xl p-6 hover-lift bg-gradient-to-r ${kpi.gradient} border ${kpi.border} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{kpi.icon}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{kpi.title.split(' ')[0]}</p>
                  <p className="text-lg font-semibold text-white">{kpi.title.split(' ').slice(1).join(' ')}</p>
                </div>
              </div>
              <div className={`text-3xl font-bold ${kpi.textColor} mb-1`}>{kpi.value}</div>
              <div className="text-xs text-gray-400">{kpi.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance KPI Cards - Full Width Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div 
                key={indicator.title}
                className="glass rounded-xl p-6 hover-lift relative bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg bg-white/10 border border-white/20`}>
                    <Icon className={`w-5 h-5 ${getStatusColor(indicator.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white text-sm">{indicator.title}</h3>
                    <p className="text-xs text-gray-400">Target: {indicator.target}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`text-2xl font-bold ${getStatusColor(indicator.status)}`}>
                    {indicator.value}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {indicator.status}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-2">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${getProgressColor(indicator.status)}`}
                      style={{ 
                        width: `${indicator.percentage}%`,
                        boxShadow: `0 0 8px ${
                          indicator.status === "excellent" ? "hsl(120 100% 50%)" :
                          indicator.status === "good" ? "hsl(192 100% 50%)" :
                          indicator.status === "warning" ? "hsl(45 100% 55%)" :
                          "hsl(0 100% 60%)"
                        }`
                      }}
                    />
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-3 right-3">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      indicator.status === "excellent" ? "bg-accent animate-pulse" :
                      indicator.status === "good" ? "bg-primary" :
                      indicator.status === "warning" ? "bg-warning animate-pulse" :
                      "bg-destructive animate-pulse"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}