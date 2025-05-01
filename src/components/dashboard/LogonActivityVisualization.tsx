
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { LogIn, Table } from 'lucide-react';
import { LogonActivityLog } from '@/services/mockData';
import { cn } from '@/lib/utils';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LogonActivityVisualizationProps {
  logs: LogonActivityLog[];
  className?: string;
}

const LogonActivityVisualization: React.FC<LogonActivityVisualizationProps> = ({ logs, className }) => {
  if (!logs.length) return null;
  
  // Process data for visualization
  const hostData = logs.map(log => ({
    hostname: log.Details.Hostname,
    date: log.Details.Date,
    logins: log.Details["No. of Logins"],
    logouts: log.Details["No. of Logouts"],
    failedLogins: log.Details["No. of Failed Login Attempts"],
    accountLockouts: log.Details["No. of Account Lockout Attempts"]
  }));
  
  // Aggregate by hostname
  const aggregatedData = hostData.reduce<Record<string, {logins: number, logouts: number, failedLogins: number, accountLockouts: number}>>((acc, log) => {
    if (!acc[log.hostname]) {
      acc[log.hostname] = {
        logins: 0,
        logouts: 0,
        failedLogins: 0,
        accountLockouts: 0
      };
    }
    
    acc[log.hostname].logins += log.logins;
    acc[log.hostname].logouts += log.logouts;
    acc[log.hostname].failedLogins += log.failedLogins;
    acc[log.hostname].accountLockouts += log.accountLockouts;
    
    return acc;
  }, {});
  
  // Transform for chart data
  const chartData = Object.entries(aggregatedData).map(([hostname, data]) => ({
    hostname,
    ...data,
    anomalyScore: (data.failedLogins * 0.6 + data.accountLockouts * 0.4) / (data.logins || 1)
  })).sort((a, b) => b.anomalyScore - a.anomalyScore);
  
  const dayMapper = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const periodMapper = ["", "Morning (00:00-06:00)", "Day (06:00-12:00)", "Afternoon (12:00-18:00)", "Night (18:00-24:00)"];

  return (
    <Card className={cn("cyber-border backdrop-blur-sm scanning-effect", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Logon Activity Analysis
        </CardTitle>
        <CardDescription>
          {logs.length} logon activity events analyzed by host and time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="space-y-4">
            <div className="h-72">
              <ChartContainer
                config={{
                  logins: { label: "Logins" },
                  logouts: { label: "Logouts" },
                  failedLogins: { label: "Failed Logins" },
                  accountLockouts: { label: "Account Lockouts" }
                }}
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 80, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="hostname" 
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="logins" fill="#10b981" />
                  <Bar dataKey="logouts" fill="#6366f1" />
                  <Bar dataKey="failedLogins" fill="#f97316" />
                  <Bar dataKey="accountLockouts" fill="#ef4444" />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="table">
            <div className="border border-border/30 rounded-md overflow-hidden">
              <UITable>
                <TableHeader className="bg-secondary/50 backdrop-blur-sm">
                  <TableRow>
                    <TableHead className="text-xs font-medium">Hostname</TableHead>
                    <TableHead className="text-xs font-medium">Date</TableHead>
                    <TableHead className="text-xs font-medium">Day/Time</TableHead>
                    <TableHead className="text-xs font-medium text-right">Logins</TableHead>
                    <TableHead className="text-xs font-medium text-right">Logouts</TableHead>
                    <TableHead className="text-xs font-medium text-right">Failed Attempts</TableHead>
                    <TableHead className="text-xs font-medium text-right">Lockouts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, idx) => (
                    <TableRow key={idx} className={log.Details["No. of Failed Login Attempts"] > 0 || log.Details["No. of Account Lockout Attempts"] > 0 ? "bg-destructive/10" : ""}>
                      <TableCell className="text-xs font-medium">{log.Details.Hostname}</TableCell>
                      <TableCell className="text-xs">{log.Details.Date || "N/A"}</TableCell>
                      <TableCell className="text-xs">
                        {dayMapper[log.Details.Day] || "Unknown"} / {periodMapper[log.Details["Time Period"]] || "Unknown"}
                      </TableCell>
                      <TableCell className="text-xs text-right">{log.Details["No. of Logins"]}</TableCell>
                      <TableCell className="text-xs text-right">{log.Details["No. of Logouts"]}</TableCell>
                      <TableCell className="text-xs text-right">
                        {log.Details["No. of Failed Login Attempts"] > 0 ? (
                          <span className="text-anomaly-high font-medium">{log.Details["No. of Failed Login Attempts"]}</span>
                        ) : (
                          log.Details["No. of Failed Login Attempts"]
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-right">
                        {log.Details["No. of Account Lockout Attempts"] > 0 ? (
                          <span className="text-anomaly-high font-medium">{log.Details["No. of Account Lockout Attempts"]}</span>
                        ) : (
                          log.Details["No. of Account Lockout Attempts"]
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LogonActivityVisualization;
