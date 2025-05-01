
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Network, Table } from 'lucide-react';
import { NetworkActivityLog } from '@/services/mockData';
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

interface NetworkActivityVisualizationProps {
  logs: NetworkActivityLog[];
  className?: string;
}

const NetworkActivityVisualization: React.FC<NetworkActivityVisualizationProps> = ({ logs, className }) => {
  if (!logs.length) return null;

  // Process network activity data
  const processedLogs = logs.map(log => ({
    user: log.Details.user,
    date: log.Details.date,
    time: log.Details.time,
    port: log.Details.dstport,
    duration: log.Details.duration,
    sentBytes: log.Details.sentbyte,
    receivedBytes: log.Details.rcvdbyte,
    sentPackets: log.Details.sentpkt,
    receivedPackets: log.Details.rcvdpkt,
    totalBytes: log.Details.sentbyte + log.Details.rcvdbyte
  }));

  // Aggregate data by user
  const userTrafficData = processedLogs.reduce<Record<string, {
    sentBytes: number,
    receivedBytes: number,
    totalBytes: number,
    avgDuration: number,
    connections: number
  }>>((acc, log) => {
    if (!acc[log.user]) {
      acc[log.user] = {
        sentBytes: 0,
        receivedBytes: 0,
        totalBytes: 0,
        avgDuration: 0,
        connections: 0
      };
    }
    
    acc[log.user].sentBytes += log.sentBytes;
    acc[log.user].receivedBytes += log.receivedBytes;
    acc[log.user].totalBytes += log.totalBytes;
    acc[log.user].avgDuration = 
      (acc[log.user].avgDuration * acc[log.user].connections + log.duration) / 
      (acc[log.user].connections + 1);
    acc[log.user].connections += 1;
    
    return acc;
  }, {});
  
  // Format for chart
  const chartData = Object.entries(userTrafficData).map(([user, data]) => ({
    user,
    sentBytes: data.sentBytes,
    receivedBytes: data.receivedBytes,
    totalBytes: data.totalBytes,
    avgDuration: Math.round(data.avgDuration),
    connections: data.connections
  })).sort((a, b) => b.totalBytes - a.totalBytes);

  // Format port usage
  const portUsageData = processedLogs.reduce<Record<number, number>>((acc, log) => {
    acc[log.port] = (acc[log.port] || 0) + 1;
    return acc;
  }, {});

  const portData = Object.entries(portUsageData)
    .map(([port, count]) => ({ port: Number(port), count }))
    .sort((a, b) => b.count - a.count);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <Card className={cn("cyber-border backdrop-blur-sm scanning-effect", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Network Traffic Analysis
        </CardTitle>
        <CardDescription>
          {logs.length} network activity events analyzed by user and port
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic">
          <TabsList className="mb-4">
            <TabsTrigger value="traffic">Traffic Volume</TabsTrigger>
            <TabsTrigger value="ports">Port Usage</TabsTrigger>
            <TabsTrigger value="table">Connection Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traffic" className="space-y-4">
            <div className="h-72">
              <ChartContainer
                config={{
                  sentBytes: { label: "Sent" },
                  receivedBytes: { label: "Received" }
                }}
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="user"
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} 
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                    stroke="rgba(255,255,255,0.1)"
                    tickFormatter={formatBytes}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatBytes(value), '']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sentBytes" name="Sent" fill="#9b87f5" />
                  <Bar dataKey="receivedBytes" name="Received" fill="#10b981" />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="ports" className="space-y-4">
            <div className="h-72">
              <ChartContainer
                config={{
                  count: { label: "Connections" }
                }}
              >
                <BarChart
                  data={portData.slice(0, 10)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="port"
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
                  <Bar dataKey="count" name="Connections" fill="#6366f1" />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="text-xs text-center text-muted-foreground mt-2">
              Top 10 ports by number of connections
            </div>
          </TabsContent>
          
          <TabsContent value="table">
            <div className="border border-border/30 rounded-md overflow-hidden">
              <UITable>
                <TableHeader className="bg-secondary/50 backdrop-blur-sm">
                  <TableRow>
                    <TableHead className="text-xs font-medium">User</TableHead>
                    <TableHead className="text-xs font-medium">Date</TableHead>
                    <TableHead className="text-xs font-medium">Time</TableHead>
                    <TableHead className="text-xs font-medium text-right">Port</TableHead>
                    <TableHead className="text-xs font-medium text-right">Duration (ms)</TableHead>
                    <TableHead className="text-xs font-medium text-right">Sent</TableHead>
                    <TableHead className="text-xs font-medium text-right">Received</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedLogs.map((log, idx) => (
                    <TableRow key={idx} className={log.sentBytes > 100000 || log.receivedBytes > 100000 ? "bg-destructive/10" : ""}>
                      <TableCell className="text-xs font-medium">{log.user}</TableCell>
                      <TableCell className="text-xs">{log.date}</TableCell>
                      <TableCell className="text-xs">{log.time}</TableCell>
                      <TableCell className="text-xs text-right">
                        <span className="px-2 py-1 rounded-full bg-secondary/50 text-xs">
                          {log.port}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-right">{log.duration}</TableCell>
                      <TableCell className="text-xs text-right">
                        <span className={log.sentBytes > 100000 ? "text-anomaly-high font-medium" : ""}>
                          {formatBytes(log.sentBytes)}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-right">
                        <span className={log.receivedBytes > 100000 ? "text-anomaly-high font-medium" : ""}>
                          {formatBytes(log.receivedBytes)}
                        </span>
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

export default NetworkActivityVisualization;
