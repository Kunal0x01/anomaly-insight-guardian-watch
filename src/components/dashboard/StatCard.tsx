
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  trendLabel?: string;
  variant?: "default" | "anomaly" | "outline";
  className?: string;
}

const cardVariants = cva(
  "rounded-lg p-4 transition-all relative overflow-hidden flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-card",
        anomaly: "bg-secondary/70 border border-primary/50",
        outline: "border border-border bg-secondary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel,
  variant = "default",
  className,
}: StatCardProps) => {
  return (
    <div className={cn(cardVariants({ variant }), className)}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {trend !== undefined && (
        <div className={cn("flex items-center gap-1 text-xs mt-2", 
          trend > 0 ? "text-anomaly-high" : trend < 0 ? "text-anomaly-low" : "text-muted-foreground"
        )}>
          {trend > 0 ? "↑" : trend < 0 ? "↓" : "–"}
          <span>{Math.abs(trend)}%</span>
          {trendLabel && <span className="text-muted-foreground ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
