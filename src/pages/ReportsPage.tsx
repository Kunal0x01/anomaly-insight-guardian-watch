
import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, Download, Clock, Calendar, BarChart2, Users, Shield, 
  FileBarChart, AlertTriangle, CheckCircle2, Printer, ExternalLink, ChevronDown
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchLogs, getLogServerUrl, calculateRiskScore, calculateFileAccessRiskScore, calculateLogonRiskScore, calculateNetworkRiskScore } from "@/services/logService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";
import AnomalyTrend from "@/components/dashboard/AnomalyTrend";
import NetworkActivityGraph from "@/components/dashboard/NetworkActivityGraph";
import { Progress } from "@/components/ui/progress";
import { FileAccessLog, LogonActivityLog, NetworkActivityLog } from "@/services/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ReportsPage = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("weekly");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [fileAccessLogs, setFileAccessLogs] = useState<FileAccessLog[]>([]);
  const [logonActivityLogs, setLogonActivityLogs] = useState<LogonActivityLog[]>([]);
  const [networkActivityLogs, setNetworkActivityLogs] = useState<NetworkActivityLog[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const fetchLogData = async () => {
    try {
      const logs = await fetchLogs();
      setFileAccessLogs(logs.fileAccessLogs);
      setLogonActivityLogs(logs.logonActivityLogs);
      setNetworkActivityLogs(logs.networkActivityLogs);
    } catch (error) {
      console.error("Error fetching logs for report:", error);
      toast({
        title: "Error fetching log data",
        description: "Could not retrieve log data for the report. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    fetchLogData();
  }, []);

  // Process network activity data for visualization
  const processNetworkData = () => {
    if (!networkActivityLogs.length) return [];
    
    // Group logs by hour
    const byHour = networkActivityLogs.reduce((acc: Record<string, any>, log) => {
      const hour = log.Details.time.split(':')[0] || '00';
      const key = `${hour}:00`;
      
      if (!acc[key]) {
        acc[key] = { sentBytes: 0, receivedBytes: 0, anomalyScore: 0 };
      }
      
      acc[key].sentBytes += log.Details.sentbyte || 0;
      acc[key].receivedBytes += log.Details.rcvdbyte || 0;
      
      // Calculate anomaly score
      const totalBytes = (log.Details.sentbyte || 0) + (log.Details.rcvdbyte || 0);
      if (totalBytes > 100000) {
        acc[key].anomalyScore = Math.max(acc[key].anomalyScore, 0.8);
      } else if (totalBytes > 50000) {
        acc[key].anomalyScore = Math.max(acc[key].anomalyScore, 0.5);
      }
      
      return acc;
    }, {});
    
    return Object.entries(byHour).map(([timestamp, data]) => ({
      timestamp,
      sentBytes: data.sentBytes,
      receivedBytes: data.receivedBytes,
      anomalyScore: data.anomalyScore
    })).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  };
  
  // Calculate overall risk statistics
  const calculateRiskStats = () => {
    const users = new Set<string>();
    const userRiskScores: Record<string, {fileAccess: number, logon: number, network: number}> = {};
    
    // Process file access logs
    fileAccessLogs.forEach(log => {
      const hostname = log.Details.Hostname;
      users.add(hostname);
      
      if (!userRiskScores[hostname]) {
        userRiskScores[hostname] = { fileAccess: 0, logon: 0, network: 0 };
      }
      
      userRiskScores[hostname].fileAccess = calculateFileAccessRiskScore(log);
    });
    
    // Process logon activity logs
    logonActivityLogs.forEach(log => {
      const hostname = log.Details.Hostname;
      users.add(hostname);
      
      if (!userRiskScores[hostname]) {
        userRiskScores[hostname] = { fileAccess: 0, logon: 0, network: 0 };
      }
      
      userRiskScores[hostname].logon = calculateLogonRiskScore(log);
    });
    
    // Process network activity logs
    networkActivityLogs.forEach(log => {
      const username = log.Details.user;
      users.add(username);
      
      if (!userRiskScores[username]) {
        userRiskScores[username] = { fileAccess: 0, logon: 0, network: 0 };
      }
      
      userRiskScores[username].network = calculateNetworkRiskScore(log);
    });
    
    // Calculate total risk scores for each user
    const userTotalRiskScores = Object.entries(userRiskScores).map(([user, scores]) => {
      const totalRiskScore = calculateRiskScore(
        scores.fileAccess, 
        scores.logon, 
        scores.network
      );
      
      return { user, riskScore: totalRiskScore };
    }).sort((a, b) => b.riskScore - a.riskScore);
    
    // Count users by risk level
    const criticalRisk = userTotalRiskScores.filter(u => u.riskScore > 0.8).length;
    const highRisk = userTotalRiskScores.filter(u => u.riskScore > 0.6 && u.riskScore <= 0.8).length;
    const mediumRisk = userTotalRiskScores.filter(u => u.riskScore > 0.3 && u.riskScore <= 0.6).length;
    const lowRisk = userTotalRiskScores.filter(u => u.riskScore <= 0.3).length;
    
    // Calculate anomaly counts
    const fileAnomalies = fileAccessLogs.filter(log => log.Details["Number of Files Accessed"] > 20).length;
    const loginAnomalies = logonActivityLogs.filter(log => 
      (log.Details["No. of Failed Login Attempts"] || 0) > 3 || 
      (log.Details["No. of Account Lockout Attempts"] || 0) > 0
    ).length;
    const networkAnomalies = networkActivityLogs.filter(log => 
      (log.Details.sentbyte || 0) > 100000 || 
      (log.Details.rcvdbyte || 0) > 100000
    ).length;
    
    return {
      totalUsers: users.size,
      criticalRisk,
      highRisk,
      mediumRisk,
      lowRisk,
      topRiskUsers: userTotalRiskScores.slice(0, 5),
      fileAnomalies,
      loginAnomalies,
      networkAnomalies,
      totalAnomalies: fileAnomalies + loginAnomalies + networkAnomalies
    };
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    
    setTimeout(async () => {
      try {
        if (!reportRef.current) {
          throw new Error("Report element not found");
        }
  
        // Generate PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const reportElement = reportRef.current;
        
        const canvas = await html2canvas(reportElement, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#0f1729" // Match the dark theme background
        });
        
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // If content exceeds one page, add more pages as needed
        let heightLeft = pdfHeight;
        let position = 0;
        
        while (heightLeft >= pdf.internal.pageSize.getHeight()) {
          position = heightLeft - pdf.internal.pageSize.getHeight();
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }
        
        // Save the PDF
        pdf.save(`Security_Log_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Report Generated Successfully",
          description: "Your security log analysis report has been generated and downloaded.",
        });
      } catch (error) {
        console.error("Error generating report:", error);
        toast({
          title: "Report Generation Failed",
          description: "There was a problem generating your report. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGeneratingReport(false);
      }
    }, 500);
  };

  const riskStats = calculateRiskStats();
  const networkData = processNetworkData();

  return (
    <>
      <Helmet>
        <title>Reports | AnomalyGuard</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <div className="flex items-center gap-3">
              <Select 
                defaultValue={reportType} 
                onValueChange={setReportType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                <FileText className="mr-2 h-4 w-4" /> 
                {isGeneratingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="report-preview">
            <TabsList>
              <TabsTrigger value="report-preview">Report Preview</TabsTrigger>
              <TabsTrigger value="recent">Recent Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            {/* Report Preview */}
            <TabsContent value="report-preview" className="mt-6">
              <div className="flex justify-end mb-4 space-x-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" /> Share
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>PDF</DropdownMenuItem>
                    <DropdownMenuItem>CSV</DropdownMenuItem>
                    <DropdownMenuItem>Excel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Report Content */}
              <div 
                className="border border-border rounded-lg p-6 bg-background space-y-6" 
                ref={reportRef}
              >
                {/* Report Header */}
                <div className="space-y-2 border-b border-border pb-4">
                  <h1 className="text-2xl font-bold">Security Log Analysis Report</h1>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Generated on: {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: '2-digit', 
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileBarChart className="h-4 w-4" />
                      <span>Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Summary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Log server: {getLogServerUrl()}</span>
                    </div>
                    <p className="mt-2">
                      This report contains comprehensive analysis of security logs, 
                      highlighting potential security threats, anomalies, and user behavior patterns.
                    </p>
                  </div>
                </div>
                
                {/* Executive Summary */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Executive Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <Card className="bg-secondary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Monitored Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Users className="h-8 w-8 text-primary" />
                          <span className="text-2xl font-bold">{riskStats.totalUsers}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-secondary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Anomalies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <AlertTriangle className="h-8 w-8 text-anomaly-high" />
                          <span className="text-2xl font-bold">{riskStats.totalAnomalies}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-secondary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">High Risk Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Shield className="h-8 w-8 text-anomaly-medium" />
                          <span className="text-2xl font-bold">{riskStats.highRisk + riskStats.criticalRisk}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-secondary/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Security Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <CheckCircle2 className="h-8 w-8 text-anomaly-low" />
                          <span className="text-2xl font-bold">
                            {Math.max(0, 100 - (riskStats.totalAnomalies * 5))}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Risk Distribution */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Risk Distribution</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">User Risk Levels</CardTitle>
                        <CardDescription>Distribution of users by risk category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {/* Risk Distribution Bars */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Critical Risk</span>
                              <span className="text-sm font-medium text-red-500">{riskStats.criticalRisk}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-500 rounded-full" 
                                style={{ width: `${(riskStats.criticalRisk / riskStats.totalUsers) * 100}%` }} 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">High Risk</span>
                              <span className="text-sm font-medium text-anomaly-high">{riskStats.highRisk}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-anomaly-high rounded-full" 
                                style={{ width: `${(riskStats.highRisk / riskStats.totalUsers) * 100}%` }} 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Medium Risk</span>
                              <span className="text-sm font-medium text-anomaly-medium">{riskStats.mediumRisk}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-anomaly-medium rounded-full" 
                                style={{ width: `${(riskStats.mediumRisk / riskStats.totalUsers) * 100}%` }} 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Low Risk</span>
                              <span className="text-sm font-medium text-anomaly-low">{riskStats.lowRisk}</span>
                            </div>
                            <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-anomaly-low rounded-full" 
                                style={{ width: `${(riskStats.lowRisk / riskStats.totalUsers) * 100}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Network Activity */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Network Activity</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="h-80">
                      <NetworkActivityGraph 
                        data={networkData} 
                        title="Network Traffic Analysis" 
                        description="Sent and received bytes with anomaly detection"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Top Risk Users */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Top Risk Users</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Highest Risk Users</CardTitle>
                        <CardDescription>Users with the highest calculated risk scores</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {riskStats.topRiskUsers.map((user, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/50 mr-3">
                                <Users className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{user.user}</h4>
                                  <span className={`text-sm font-bold ${
                                    user.riskScore > 0.7 ? 'text-anomaly-high' :
                                    user.riskScore > 0.4 ? 'text-anomaly-medium' : 'text-anomaly-low'
                                  }`}>{(user.riskScore * 100).toFixed(0)}%</span>
                                </div>
                                <Progress 
                                  className="h-2 mt-1" 
                                  value={user.riskScore * 100} 
                                  indicatorClassName={
                                    user.riskScore > 0.7 ? 'bg-anomaly-high' :
                                    user.riskScore > 0.4 ? 'bg-anomaly-medium' : 'bg-anomaly-low'
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* File Access Analysis */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">File Access Analysis</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="h-80">
                      <AnomalyTrend
                        title="File Access Activity"
                        description="Number of files accessed with anomaly detection"
                        data={fileAccessLogs.map(log => ({
                          name: `${log.Details.Hostname}`,
                          value: log.Details["Number of Files Accessed"] || 0,
                          anomalyScore: log.Details["Number of Files Accessed"] > 20 ? 0.8 : 0.3
                        }))}
                        gradientFrom="rgba(16, 185, 129, 0.2)"
                        gradientTo="rgba(16, 185, 129, 0)"
                        height={260}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Login Activity Analysis */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Login Activity Analysis</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="h-80">
                      <AnomalyTrend
                        title="Failed Login Attempts"
                        description="Failed login attempts with anomaly detection"
                        data={logonActivityLogs
                          .filter(log => (log.Details["No. of Failed Login Attempts"] || 0) > 0)
                          .map(log => ({
                            name: `${log.Details.Hostname}`,
                            value: log.Details["No. of Failed Login Attempts"] || 0,
                            anomalyScore: (log.Details["No. of Failed Login Attempts"] || 0) > 3 ? 0.9 : 0.6
                          }))}
                        gradientFrom="rgba(239, 68, 68, 0.2)"
                        gradientTo="rgba(239, 68, 68, 0)"
                        height={260}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Risk Calculation Methodology */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Risk Calculation Methodology</h2>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Risk Score Formula</CardTitle>
                      <CardDescription>How risk scores are calculated for users and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-secondary/20 rounded-md border border-border/30">
                        <h4 className="font-medium mb-2">Risk Score Formula</h4>
                        <p className="text-sm">
                          Risk_Score = 38.36454020555577*s1[-0.03249382] + s2[0.05180103] + s3[0.18216909]
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>Where:</p>
                          <ul className="list-disc pl-6">
                            <li>s1 = File Access Score (based on number of files accessed)</li>
                            <li>s2 = Logon Activity Score (based on failed logins and account lockouts)</li>
                            <li>s3 = Network Activity Score (based on data transfer volumes)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-secondary/20 rounded-md border border-border/30">
                          <h4 className="font-medium mb-2">File Access Risk</h4>
                          <p className="text-sm">
                            Risk increases as the number of files accessed increases. 
                            Access to more than 20 files in a short period is flagged as suspicious.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-secondary/20 rounded-md border border-border/30">
                          <h4 className="font-medium mb-2">Login Activity Risk</h4>
                          <p className="text-sm">
                            Multiple failed login attempts and account lockouts significantly 
                            increase risk score. Each failed attempt raises the risk level.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-secondary/20 rounded-md border border-border/30">
                          <h4 className="font-medium mb-2">Network Activity Risk</h4>
                          <p className="text-sm">
                            Large data transfers (over 100KB) are considered high risk, potentially 
                            indicating data exfiltration attempts or malware communication.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recommendations */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Security Recommendations</h2>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Suggested Actions</CardTitle>
                      <CardDescription>Recommended steps to address identified security risks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <AlertTriangle className="h-5 w-5 text-anomaly-high" />
                          </div>
                          <div>
                            <h4 className="font-medium">Investigate High-Risk Users</h4>
                            <p className="text-sm text-muted-foreground">
                              Conduct detailed investigation of users with risk scores above 70%, focusing on 
                              unusual file access patterns and network activities.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Shield className="h-5 w-5 text-anomaly-medium" />
                          </div>
                          <div>
                            <h4 className="font-medium">Review Authentication Policies</h4>
                            <p className="text-sm text-muted-foreground">
                              Implement stronger password policies and multi-factor authentication for all users, 
                              especially those with elevated privileges.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <FileBarChart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Enhance Network Monitoring</h4>
                            <p className="text-sm text-muted-foreground">
                              Set up alerts for large data transfers, especially during non-business hours or from 
                              unusual locations.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">User Security Training</h4>
                            <p className="text-sm text-muted-foreground">
                              Conduct regular security awareness training for all users with emphasis on recognizing 
                              phishing attempts and proper handling of sensitive data.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Footer */}
                <div className="pt-4 border-t border-border text-center text-sm text-muted-foreground">
                  <p>Generated by AnomalyGuard Security Platform • {new Date().toLocaleDateString()}</p>
                  <p className="mt-1">Confidential Security Information</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Weekly Anomaly Summary", icon: Shield, date: "April 7, 2025" },
                  { title: "User Activity Report", icon: Users, date: "April 1, 2025" },
                  { title: "Compliance Audit", icon: FileText, date: "March 30, 2025" },
                  { title: "Security Metrics", icon: BarChart2, date: "March 25, 2025" },
                  { title: "Monthly Executive Summary", icon: FileText, date: "March 1, 2025" },
                ].map((report, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-2">
                        <report.icon className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <CardDescription>Generated on {report.date}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="flex justify-between items-center w-full">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Scheduled Reports
                  </CardTitle>
                  <CardDescription>Configure your automatic report generation schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Weekly Security Summary</p>
                        <p className="text-sm text-muted-foreground">Every Monday at 8:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Executive Dashboard</p>
                        <p className="text-sm text-muted-foreground">1st day of each month</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Daily Alert Digest</p>
                        <p className="text-sm text-muted-foreground">Daily at 5:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule New Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Available Templates</CardTitle>
                    <CardDescription>Use these pre-configured report templates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>Security Incidents Summary</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>User Behavior Analysis</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-primary" />
                        <span>Compliance Audit Report</span>
                      </div>
                      <Button variant="ghost" size="sm">Use</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Create Custom Template</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export Options</CardTitle>
                    <CardDescription>Configure how reports are generated and shared</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Format</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">PDF</Button>
                        <Button variant="outline" size="sm">Excel</Button>
                        <Button variant="outline" size="sm">CSV</Button>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Delivery</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Email</Button>
                        <Button variant="outline" size="sm">Dashboard</Button>
                        <Button variant="outline" size="sm">API</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ReportsPage;
