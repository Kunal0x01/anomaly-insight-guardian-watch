
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnomalyTrend from "@/components/dashboard/AnomalyTrend";
import { fileAccessData, failedLoginData, loginActivityData } from "@/services/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

// Mock data for the algorithm performance
const algorithmPerformanceData = [
  { feature: "Time Period", importance: 0.4521 },
  { feature: "Day", importance: 0.1245 },
  { feature: "No. of Logins", importance: 0.2756 },
  { feature: "No. of Logouts", importance: 0.1523 },
  { feature: "Failed Login Attempts", importance: 0.6823 },
  { feature: "Account Lockouts", importance: 0.8941 },
];

// Mock data for the anomaly distribution
const anomalyDistributionData = [
  { name: "Login Time", count: 8 },
  { name: "Failed Logins", count: 12 },
  { name: "File Access", count: 15 },
  { name: "Data Volume", count: 6 },
  { name: "Account Lockout", count: 3 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Review performance metrics and anomaly detection statistics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnomalyTrend
          title="Login Activity Analysis"
          description="Pattern visualization with anomaly detection"
          data={loginActivityData}
        />
        <AnomalyTrend
          title="Failed Login Analysis"
          description="Failed login attempts with anomaly scores"
          data={failedLoginData}
          gradientFrom="rgba(239, 68, 68, 0.2)"
          gradientTo="rgba(239, 68, 68, 0)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>
              Relative importance of features in anomaly detection algorithm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={algorithmPerformanceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    domain={[0, 1]} 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    dataKey="feature" 
                    type="category" 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      color: "white"
                    }}
                    formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Importance']}
                  />
                  <Bar 
                    dataKey="importance" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomaly Distribution</CardTitle>
            <CardDescription>
              Types of anomalies detected in the environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={anomalyDistributionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      color: "white"
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Access Anomaly Detection</CardTitle>
            <CardDescription>
              Analysis of file access patterns with anomaly scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fileAccessData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 1]}
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))", 
                      borderColor: "hsl(var(--border))",
                      color: "white"
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name="File Access Count"
                    stroke="#10b981" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="anomalyScore" 
                    name="Anomaly Score"
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
