
import React, { useState } from "react";
import { BarChart2, FileText, Shield, ShieldAlert, User, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AnomalyTrend from "@/components/dashboard/AnomalyTrend";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import AnomalyScoreGauge from "@/components/dashboard/AnomalyScoreGauge";
import AlertList from "@/components/dashboard/AlertList";
import FirewallLogsTable from "@/components/dashboard/FirewallLogsTable";
import NetworkActivityGraph from "@/components/dashboard/NetworkActivityGraph";
import UserRiskScoreCard from "@/components/dashboard/UserRiskScoreCard";
import LogFileUploader from "@/components/dashboard/LogFileUploader";
import FileAccessVisualization from "@/components/dashboard/FileAccessVisualization";
import LogonActivityVisualization from "@/components/dashboard/LogonActivityVisualization";
import NetworkActivityVisualization from "@/components/dashboard/NetworkActivityVisualization";
import { useNavigate } from "react-router-dom";
import { 
  alertsData, 
  dashboardStats, 
  failedLoginData, 
  fileAccessData, 
  hoursLabels, 
  daysLabels, 
  loginActivityData, 
  loginHeatmapData,
  enhancedUserRiskData,
  topRiskyEntities,
  firewallLogs,
  networkActivityData,
  uploadedFileAccessLogs,
  uploadedLogonActivityLogs,
  uploadedNetworkActivityLogs
} from "@/services/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [hasFileAccess, setHasFileAccess] = useState(false);
  const [hasLogonActivity, setHasLogonActivity] = useState(false);
  const [hasNetworkActivity, setHasNetworkActivity] = useState(false);

  const handleViewAllAlerts = () => {
    navigate("/alerts");
  };

  const handleLogsProcessed = (fileAccessCount: number, logonActivityCount: number, networkActivityCount: number) => {
    setHasFileAccess(fileAccessCount > 0);
    setHasLogonActivity(logonActivityCount > 0);
    setHasNetworkActivity(networkActivityCount > 0);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor user behavior and security anomalies</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Last updated: April 7, 2025 - 16:45</div>
        </div>
      </div>

      {/* Log File Upload */}
      <div className="mb-6">
        <LogFileUploader onLogsProcessed={handleLogsProcessed} />
      </div>

      {/* Uploaded Data Visualizations */}
      {(hasFileAccess || hasLogonActivity || hasNetworkActivity) && (
        <div className="grid grid-cols-1 gap-6 mb-6">
          {hasFileAccess && (
            <FileAccessVisualization logs={uploadedFileAccessLogs} />
          )}
          
          {hasLogonActivity && (
            <LogonActivityVisualization logs={uploadedLogonActivityLogs} />
          )}
          
          {hasNetworkActivity && (
            <NetworkActivityVisualization logs={uploadedNetworkActivityLogs} />
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Monitored Users"
          value={dashboardStats.totalUsers}
          icon={<Users size={20} />}
          description={`${dashboardStats.activeUsers} currently active`}
        />
        <StatCard
          title="Anomalies Today"
          value={dashboardStats.todayAnomalies}
          icon={<ShieldAlert size={20} />}
          description={`${dashboardStats.totalAnomalies} this week`}
          trend={22}
          trendLabel="vs. yesterday"
          variant="anomaly"
        />
        <StatCard
          title="High Risk Users"
          value={dashboardStats.highRiskUsers}
          icon={<Shield size={20} />}
          description={`${dashboardStats.mediumRiskUsers} medium risk, ${dashboardStats.lowRiskUsers} low risk`}
        />
        <StatCard
          title="Avg. Risk Score"
          value={`${Math.round(dashboardStats.averageRiskScore * 100)}%`}
          icon={<BarChart2 size={20} />}
          description="Across all users"
          trend={-5}
          trendLabel="vs. last week"
        />
      </div>

      {/* Charts row - User Login and Failed Login Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnomalyTrend
          title="Login Activity"
          description="Number of logins over time with anomaly score"
          data={loginActivityData}
        />
        <AnomalyTrend
          title="Failed Login Attempts"
          description="Failed login attempts with anomaly detection"
          data={failedLoginData}
          gradientFrom="rgba(239, 68, 68, 0.2)"
          gradientTo="rgba(239, 68, 68, 0)"
        />
      </div>

      {/* Network Activity Graph and User Risk Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NetworkActivityGraph
          title="Network Traffic Analysis"
          description="Sent and received bytes with anomaly detection"
          data={networkActivityData}
        />
        <UserRiskScoreCard users={enhancedUserRiskData} />
      </div>

      {/* Firewall Logs Table */}
      <div className="mb-6">
        <FirewallLogsTable logs={firewallLogs} />
      </div>

      {/* Alerts and System Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AlertList 
            alerts={alertsData} 
            onViewAll={handleViewAllAlerts}
          />
        </div>
        <div>
          <AnomalyScoreGauge
            title="Overall System Risk"
            description="Current threat assessment based on all anomalies"
            value={0.42}
          />
        </div>
      </div>

      {/* Heatmap and File Access Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityHeatmap
            title="Login Activity Heatmap"
            description="User login patterns by hour and day of week"
            data={loginHeatmapData}
            xLabels={hoursLabels}
            yLabels={daysLabels}
          />
        </div>
        <div className="lg:col-span-1">
          <AnomalyTrend
            title="File Access Activity"
            description="File access operations with anomaly detection"
            data={fileAccessData}
            gradientFrom="rgba(16, 185, 129, 0.2)"
            gradientTo="rgba(16, 185, 129, 0)"
            height={250}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
