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

  return (
    <div className="glass rounded-xl p-6 hover-lift">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Key Performance Indicators
        </h2>
        <p className="text-sm text-muted-foreground">
          Key business metrics and operational indicators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <div 
              key={indicator.title}
              className="relative p-4 rounded-lg glass-subtle hover:bg-glass/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-glass border border-glass-border`}>
                    <Icon className={`w-4 h-4 ${getStatusColor(indicator.status)}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{indicator.title}</h3>
                    <p className="text-xs text-muted-foreground">Target: {indicator.target}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getStatusColor(indicator.status)}`}>
                    {indicator.value}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {indicator.status}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
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
              <div className="absolute top-2 right-2">
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
  );
}