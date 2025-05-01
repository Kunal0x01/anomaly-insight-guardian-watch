
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface RiskFactor {
  factor: string;
  weight: number;
  score: number;
}

interface UserRiskFactorsProps {
  userId: string;
  userName: string;
  factors: RiskFactor[];
  className?: string;
}

const UserRiskFactors: React.FC<UserRiskFactorsProps> = ({
  userId,
  userName,
  factors,
  className
}) => {
  // Calculate total risk score
  const totalRiskScore = factors.reduce((total, factor) => total + (factor.weight * factor.score), 0);
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "text-anomaly-high";
    if (score >= 0.4) return "text-anomaly-medium";
    return "text-anomaly-low";
  };

  // Get progress bar color based on score
  const getProgressColor = (score: number) => {
    if (score >= 0.7) return "bg-anomaly-high";
    if (score >= 0.4) return "bg-anomaly-medium";
    return "bg-anomaly-low";
  };

  return (
    <Card className={cn("cyber-border scanning-effect", className)}>
      <CardHeader>
        <CardTitle>Risk Profile: {userName}</CardTitle>
        <CardDescription>
          Analysis of risk factors and their contribution to overall risk score
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 border border-border/30 rounded-md bg-secondary/20">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Overall Risk Score</span>
            <span className={cn("text-sm font-bold", getScoreColor(totalRiskScore))}>
              {(totalRiskScore * 100).toFixed(0)}%
            </span>
          </div>
          <Progress
            value={totalRiskScore * 100}
            className="h-2"
            indicatorClassName={getProgressColor(totalRiskScore)}
          />
        </div>

        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={`${userId}-factor-${index}`} className="space-y-1">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{factor.factor}</span>
                  <span className="text-xs text-muted-foreground">
                    (Weight: {(factor.weight * 100).toFixed(0)}%)
                  </span>
                </div>
                <span className={cn("text-sm font-bold", getScoreColor(factor.score))}>
                  {(factor.score * 100).toFixed(0)}%
                </span>
              </div>
              <Progress
                value={factor.score * 100}
                className="h-1.5"
                indicatorClassName={getProgressColor(factor.score)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 border border-border/30 rounded-md bg-secondary/20">
          <h4 className="text-sm font-medium mb-2">Risk Calculation Formula</h4>
          <p className="text-xs text-muted-foreground">
            Overall Risk = Σ(Factor Score × Factor Weight)
          </p>
          <div className="text-xs text-muted-foreground mt-1">
            {factors.map((factor, index) => (
              <span key={index}>
                {factor.factor} ({(factor.score * 100).toFixed(0)}% × {(factor.weight * 100).toFixed(0)}%)
                {index < factors.length - 1 ? " + " : ""}
              </span>
            ))}
            {" = "}<span className={getScoreColor(totalRiskScore)}>{(totalRiskScore * 100).toFixed(0)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRiskFactors;
