
import { 
  FileAccessLog, 
  LogonActivityLog, 
  NetworkActivityLog, 
  processUploadedLogs 
} from './mockData';

// Mock data for now - in a real app, this would make actual API calls to the specified IP/port
const fileAccessLogsRaw = [
  {"Hostname": "User1", "Date": "", "Time_Period": 3, "Day": 5, "Number_of_Files_Accessed": 9},
  {"Hostname": "User2", "Date": "", "Time_Period": 2, "Day": 3, "Number_of_Files_Accessed": 15},
  {"Hostname": "Admin1", "Date": "", "Time_Period": 4, "Day": 1, "Number_of_Files_Accessed": 27},
  {"Hostname": "User3", "Date": "", "Time_Period": 1, "Day": 4, "Number_of_Files_Accessed": 3},
];

const logonActivityLogsRaw = [
  {"Hostname": "Yeti", "Date": "3/28/2025", "Time_Period": 1, "Day": 5, "No._of_Logins": 31, "No._of_Logouts": 2, "No._of_Failed_Login_Attempts": 0, "No._of_Account_Lockout_Attempts": 0},
  {"Hostname": "Wolf", "Date": "3/28/2025", "Time_Period": 2, "Day": 5, "No._of_Logins": 12, "No._of_Logouts": 10, "No._of_Failed_Login_Attempts": 3, "No._of_Account_Lockout_Attempts": 0},
  {"Hostname": "Bear", "Date": "3/29/2025", "Time_Period": 3, "Day": 6, "No._of_Logins": 5, "No._of_Logouts": 5, "No._of_Failed_Login_Attempts": 0, "No._of_Account_Lockout_Attempts": 0},
  {"Hostname": "Fox", "Date": "3/29/2025", "Time_Period": 4, "Day": 6, "No._of_Logins": 8, "No._of_Logouts": 8, "No._of_Failed_Login_Attempts": 7, "No._of_Account_Lockout_Attempts": 1},
];

const networkActivityLogsRaw = [
  {"date": "9/14/2023", "time": "17:30:23", "user": "user1", "dstport": 443, "duration": 131, "sentbyte": 2517, "rcvdbyte": 7529, "sentpkt": 8, "rcvdpkt": 10},
  {"date": "9/14/2023", "time": "17:31:45", "user": "user2", "dstport": 80, "duration": 95, "sentbyte": 1834, "rcvdbyte": 15420, "sentpkt": 12, "rcvdpkt": 18},
  {"date": "9/14/2023", "time": "17:33:12", "user": "admin1", "dstport": 22, "duration": 312, "sentbyte": 125670, "rcvdbyte": 4328, "sentpkt": 86, "rcvdpkt": 42},
  {"date": "9/14/2023", "time": "17:35:30", "user": "user3", "dstport": 8080, "duration": 215, "sentbyte": 3421, "rcvdbyte": 9876, "sentpkt": 24, "rcvdpkt": 36},
];

// Risk levels for different hosts and users (simulating Risk.txt)
const riskLevels = {
  "User1": "Low",
  "User2": "Medium", 
  "User3": "Low",
  "Admin1": "High",
  "Yeti": "Low",
  "Wolf": "Medium",
  "Bear": "Low",
  "Fox": "High",
  "user1": "Low",
  "user2": "Medium",
  "user3": "Low",
  "admin1": "Critical"
};

// Convert the raw logs to the format expected by our application
function convertFileAccessLogs(rawLogs: any[]): FileAccessLog[] {
  return rawLogs.map(log => ({
    Type: "File Access",
    Details: {
      Hostname: log.Hostname,
      Date: log.Date || "",
      "Time Period": log.Time_Period,
      Day: log.Day,
      "Number of Files Accessed": log.Number_of_Files_Accessed
    },
    RiskLevel: riskLevels[log.Hostname] || "Low"
  }));
}

function convertLogonActivityLogs(rawLogs: any[]): LogonActivityLog[] {
  return rawLogs.map(log => ({
    Type: "Logon Activity",
    Details: {
      Hostname: log.Hostname,
      Date: log.Date,
      "Time Period": log.Time_Period,
      Day: log.Day,
      "No. of Logins": log.No._of_Logins, 
      "No. of Logouts": log.No._of_Logouts,
      "No. of Failed Login Attempts": log.No._of_Failed_Login_Attempts,
      "No. of Account Lockout Attempts": log.No._of_Account_Lockout_Attempts
    },
    RiskLevel: riskLevels[log.Hostname] || "Low"
  }));
}

function convertNetworkActivityLogs(rawLogs: any[]): NetworkActivityLog[] {
  return rawLogs.map(log => ({
    Type: "Network Activity",
    Details: {
      date: log.date,
      time: log.time,
      user: log.user,
      dstport: log.dstport,
      duration: log.duration,
      sentbyte: log.sentbyte,
      rcvdbyte: log.rcvdbyte,
      sentpkt: log.sentpkt,
      rcvdpkt: log.rcvdpkt
    },
    RiskLevel: riskLevels[log.user] || "Low"
  }));
}

export async function fetchLogs() {
  // In a real app, this would make actual API calls to the specified IP/port
  // For now, we'll use mock data and simulate network delay
  return new Promise<{
    fileAccessLogs: FileAccessLog[],
    logonActivityLogs: LogonActivityLog[],
    networkActivityLogs: NetworkActivityLog[]
  }>((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const fileAccessLogs = convertFileAccessLogs(fileAccessLogsRaw);
      const logonActivityLogs = convertLogonActivityLogs(logonActivityLogsRaw);
      const networkActivityLogs = convertNetworkActivityLogs(networkActivityLogsRaw);
      
      resolve({
        fileAccessLogs,
        logonActivityLogs,
        networkActivityLogs
      });
    }, 1000);
  });
}
