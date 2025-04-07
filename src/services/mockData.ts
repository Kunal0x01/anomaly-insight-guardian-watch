
// Mock data for the UEBA dashboard

// Login activity data
export const loginActivityData = [
  { name: "00:00", value: 32, anomalyScore: 0.1 },
  { name: "01:00", value: 18, anomalyScore: 0.05 },
  { name: "02:00", value: 12, anomalyScore: 0.02 },
  { name: "03:00", value: 8, anomalyScore: 0.15 },
  { name: "04:00", value: 6, anomalyScore: 0.1 },
  { name: "05:00", value: 10, anomalyScore: 0.05 },
  { name: "06:00", value: 25, anomalyScore: 0.03 },
  { name: "07:00", value: 55, anomalyScore: 0.02 },
  { name: "08:00", value: 122, anomalyScore: 0.1 },
  { name: "09:00", value: 170, anomalyScore: 0.2 },
  { name: "10:00", value: 156, anomalyScore: 0.85 },
  { name: "11:00", value: 130, anomalyScore: 0.15 },
  { name: "12:00", value: 110, anomalyScore: 0.1 },
  { name: "13:00", value: 140, anomalyScore: 0.05 },
  { name: "14:00", value: 152, anomalyScore: 0.1 },
  { name: "15:00", value: 138, anomalyScore: 0.35 },
  { name: "16:00", value: 145, anomalyScore: 0.25 },
  { name: "17:00", value: 120, anomalyScore: 0.1 },
  { name: "18:00", value: 80, anomalyScore: 0.05 },
  { name: "19:00", value: 65, anomalyScore: 0.02 },
  { name: "20:00", value: 45, anomalyScore: 0.1 },
  { name: "21:00", value: 35, anomalyScore: 0.2 },
  { name: "22:00", value: 30, anomalyScore: 0.1 },
  { name: "23:00", value: 25, anomalyScore: 0.05 },
];

// Failed login attempts data
export const failedLoginData = [
  { name: "00:00", value: 2, anomalyScore: 0.1 },
  { name: "01:00", value: 1, anomalyScore: 0.05 },
  { name: "02:00", value: 0, anomalyScore: 0.02 },
  { name: "03:00", value: 1, anomalyScore: 0.1 },
  { name: "04:00", value: 0, anomalyScore: 0.05 },
  { name: "05:00", value: 1, anomalyScore: 0.02 },
  { name: "06:00", value: 2, anomalyScore: 0.1 },
  { name: "07:00", value: 3, anomalyScore: 0.15 },
  { name: "08:00", value: 4, anomalyScore: 0.2 },
  { name: "09:00", value: 3, anomalyScore: 0.15 },
  { name: "10:00", value: 17, anomalyScore: 0.9 },
  { name: "11:00", value: 5, anomalyScore: 0.2 },
  { name: "12:00", value: 2, anomalyScore: 0.1 },
  { name: "13:00", value: 3, anomalyScore: 0.15 },
  { name: "14:00", value: 2, anomalyScore: 0.1 },
  { name: "15:00", value: 11, anomalyScore: 0.75 },
  { name: "16:00", value: 2, anomalyScore: 0.1 },
  { name: "17:00", value: 3, anomalyScore: 0.15 },
  { name: "18:00", value: 2, anomalyScore: 0.1 },
  { name: "19:00", value: 1, anomalyScore: 0.05 },
  { name: "20:00", value: 0, anomalyScore: 0.02 },
  { name: "21:00", value: 1, anomalyScore: 0.05 },
  { name: "22:00", value: 0, anomalyScore: 0.02 },
  { name: "23:00", value: 1, anomalyScore: 0.05 },
];

// File access data
export const fileAccessData = [
  { name: "00:00", value: 45, anomalyScore: 0.1 },
  { name: "01:00", value: 32, anomalyScore: 0.05 },
  { name: "02:00", value: 18, anomalyScore: 0.02 },
  { name: "03:00", value: 15, anomalyScore: 0.1 },
  { name: "04:00", value: 12, anomalyScore: 0.05 },
  { name: "05:00", value: 10, anomalyScore: 0.02 },
  { name: "06:00", value: 25, anomalyScore: 0.1 },
  { name: "07:00", value: 35, anomalyScore: 0.15 },
  { name: "08:00", value: 65, anomalyScore: 0.2 },
  { name: "09:00", value: 85, anomalyScore: 0.15 },
  { name: "10:00", value: 95, anomalyScore: 0.1 },
  { name: "11:00", value: 110, anomalyScore: 0.2 },
  { name: "12:00", value: 90, anomalyScore: 0.1 },
  { name: "13:00", value: 95, anomalyScore: 0.15 },
  { name: "14:00", value: 120, anomalyScore: 0.1 },
  { name: "15:00", value: 230, anomalyScore: 0.95 },
  { name: "16:00", value: 125, anomalyScore: 0.1 },
  { name: "17:00", value: 110, anomalyScore: 0.15 },
  { name: "18:00", value: 90, anomalyScore: 0.1 },
  { name: "19:00", value: 65, anomalyScore: 0.05 },
  { name: "20:00", value: 50, anomalyScore: 0.02 },
  { name: "21:00", value: 40, anomalyScore: 0.05 },
  { name: "22:00", value: 35, anomalyScore: 0.02 },
  { name: "23:00", value: 30, anomalyScore: 0.05 },
];

// Heatmap data - User login activity by hour and day
export const loginHeatmapData = [
  // Hours as columns, days as rows - values between 0 and 1
  [0.1, 0.05, 0.02, 0.01, 0.01, 0.05, 0.2, 0.5, 0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.7, 0.6, 0.7, 0.4, 0.2, 0.1, 0.05, 0.05, 0.03, 0.02],
  [0.1, 0.05, 0.02, 0.01, 0.01, 0.05, 0.2, 0.5, 0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.7, 0.6, 0.7, 0.4, 0.2, 0.1, 0.05, 0.05, 0.03, 0.02],
  [0.1, 0.05, 0.02, 0.01, 0.01, 0.05, 0.2, 0.5, 0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.7, 0.6, 0.7, 0.4, 0.2, 0.1, 0.05, 0.05, 0.03, 0.02],
  [0.1, 0.05, 0.02, 0.01, 0.01, 0.05, 0.2, 0.5, 0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.7, 0.6, 0.7, 0.4, 0.2, 0.1, 0.05, 0.05, 0.03, 0.02],
  [0.1, 0.05, 0.02, 0.01, 0.01, 0.05, 0.2, 0.5, 0.8, 0.9, 0.7, 0.6, 0.7, 0.8, 0.7, 0.6, 0.7, 0.4, 0.2, 0.1, 0.05, 0.05, 0.03, 0.02],
  [0.05, 0.02, 0.01, 0.01, 0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.3, 0.2, 0.3, 0.3, 0.2, 0.3, 0.2, 0.1, 0.05, 0.02, 0.02, 0.02, 0.01, 0.01],
  [0.05, 0.02, 0.01, 0.01, 0.01, 0.02, 0.05, 0.1, 0.2, 0.3, 0.3, 0.2, 0.3, 0.3, 0.2, 0.3, 0.2, 0.1, 0.05, 0.02, 0.02, 0.02, 0.01, 0.01],
];

// Hours for heatmap x-axis
export const hoursLabels = [
  "0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", 
  "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h"
];

// Days for heatmap y-axis
export const daysLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Alert data for the alerts list
export const alertsData = [
  {
    id: "alert-001",
    title: "Unusual login time detected",
    description: "User logged in outside normal working hours from unrecognized IP address",
    severity: "high",
    timestamp: "Today, 10:23 AM",
    entity: "john.doe@example.com",
    status: "new"
  },
  {
    id: "alert-002",
    title: "Excessive file access attempts",
    description: "User accessed 230 files in 1 hour, significantly above baseline of 85 files",
    severity: "high",
    timestamp: "Today, 3:15 PM",
    entity: "sarah.smith@example.com",
    status: "investigating"
  },
  {
    id: "alert-003",
    title: "Multiple failed login attempts",
    description: "17 failed login attempts detected from the same IP address",
    severity: "medium",
    timestamp: "Today, 10:05 AM",
    entity: "admin.user@example.com",
    status: "resolved"
  },
  {
    id: "alert-004",
    title: "User accessing sensitive data",
    description: "User accessed financial reports outside normal permission pattern",
    severity: "medium",
    timestamp: "Yesterday, 4:32 PM",
    entity: "finance.analyst@example.com",
    status: "investigating"
  },
  {
    id: "alert-005",
    title: "Account lockout triggered",
    description: "User account locked after multiple failed login attempts",
    severity: "low",
    timestamp: "Yesterday, 11:18 AM",
    entity: "intern.user@example.com",
    status: "resolved"
  },
  {
    id: "alert-006",
    title: "Mass file deletion detected",
    description: "User deleted 47 files in 5 minutes, potential data destruction",
    severity: "high",
    timestamp: "Apr 6, 2025 - 9:40 AM",
    entity: "developer.lead@example.com",
    status: "dismissed"
  }
] as any;

// Mock data for users/entities
export const usersData = [
  {
    id: "user-001",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "IT Administration",
    role: "System Administrator",
    riskScore: 0.75,
    lastActive: "2025-04-07T10:23:15",
    anomalies: 3,
    status: "online"
  },
  {
    id: "user-002",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    department: "Engineering",
    role: "Lead Developer",
    riskScore: 0.85,
    lastActive: "2025-04-07T15:10:22",
    anomalies: 5,
    status: "online"
  },
  {
    id: "user-003",
    name: "Admin User",
    email: "admin.user@example.com",
    department: "IT Security",
    role: "Security Analyst",
    riskScore: 0.42,
    lastActive: "2025-04-07T09:55:47",
    anomalies: 1,
    status: "online"
  },
  {
    id: "user-004",
    name: "Finance Analyst",
    email: "finance.analyst@example.com",
    department: "Finance",
    role: "Senior Analyst",
    riskScore: 0.55,
    lastActive: "2025-04-06T16:32:10",
    anomalies: 2,
    status: "offline"
  },
  {
    id: "user-005",
    name: "Intern User",
    email: "intern.user@example.com",
    department: "Marketing",
    role: "Marketing Intern",
    riskScore: 0.25,
    lastActive: "2025-04-06T11:18:40",
    anomalies: 1,
    status: "offline"
  }
];

// Top entities with highest risk scores
export const topRiskyEntities = [
  { id: "user-002", name: "Sarah Smith", department: "Engineering", riskScore: 0.85, trend: 0.12 },
  { id: "user-001", name: "John Doe", department: "IT Administration", riskScore: 0.75, trend: 0.08 },
  { id: "user-004", name: "Finance Analyst", department: "Finance", riskScore: 0.55, trend: -0.03 },
  { id: "user-003", name: "Admin User", department: "IT Security", riskScore: 0.42, trend: -0.05 },
  { id: "user-005", name: "Intern User", department: "Marketing", riskScore: 0.25, trend: 0.01 }
];

// Mock dashboard stats
export const dashboardStats = {
  totalUsers: 250,
  activeUsers: 172,
  totalAnomalies: 14,
  todayAnomalies: 5,
  highRiskUsers: 12,
  mediumRiskUsers: 28,
  lowRiskUsers: 210,
  averageRiskScore: 0.22
};
