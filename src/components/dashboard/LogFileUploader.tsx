
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import { fetchLogs } from '@/services/logService';

interface LogFileUploaderProps {
  onLogsProcessed: (fileAccessCount: number, logonActivityCount: number, networkActivityCount: number) => void;
  className?: string;
}

const LogFileUploader: React.FC<LogFileUploaderProps> = ({ onLogsProcessed, className }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchLogData = async () => {
    setIsFetching(true);
    
    try {
      const { fileAccessLogs, logonActivityLogs, networkActivityLogs } = await fetchLogs();
      
      setHasData(true);
      setLastFetched(new Date());
      
      onLogsProcessed(
        fileAccessLogs.length, 
        logonActivityLogs.length, 
        networkActivityLogs.length
      );
      
      toast({
        title: "Logs fetched successfully",
        description: `Found ${fileAccessLogs.length} file access logs, ${logonActivityLogs.length} logon activity logs, and ${networkActivityLogs.length} network activity logs.`,
      });
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast({
        title: "Error fetching logs",
        description: "Could not connect to the log server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch logs on component mount
  useEffect(() => {
    fetchLogData();
  }, []);

  const generatePDFReport = () => {
    toast({
      title: "Generating PDF Report",
      description: "Your report is being prepared...",
    });
    
    // This would be implemented with proper PDF generation
    // Currently just a placeholder
    setTimeout(() => {
      const doc = new jsPDF();
      doc.text("Security Log Analysis Report", 20, 20);
      doc.text("Generated on: " + new Date().toLocaleString(), 20, 30);
      
      // Add more sections and visualizations based on log data
      doc.text("This report contains analysis of fetched log files", 20, 40);
      
      doc.save("security-log-report.pdf");
      
      toast({
        title: "PDF Report Generated",
        description: "Your report has been downloaded.",
      });
    }, 1000);
  };

  return (
    <Card className={`cyber-border backdrop-blur-sm scanning-effect ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Log Data Processor
        </CardTitle>
        <CardDescription>
          Fetches and analyzes log data from server
          {lastFetched && (
            <span className="block text-xs mt-1 text-muted-foreground">
              Last fetched: {lastFetched.toLocaleString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="w-full relative"
              disabled={isFetching}
              onClick={fetchLogData}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? "Fetching logs..." : "Refresh Log Data"}</span>
            </Button>
            
            {hasData && (
              <Button 
                variant="secondary"
                className="w-full"
                onClick={generatePDFReport}
              >
                <FileText className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Connected to log server: localhost</p>
            <p className="mt-1">Parsing File Access, Logon Activity, and Network Activity logs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogFileUploader;
