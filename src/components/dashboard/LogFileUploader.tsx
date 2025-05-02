
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileJson, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { processUploadedLogs } from '@/services/mockData';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';

interface LogFileUploaderProps {
  onLogsProcessed: (fileAccessCount: number, logonActivityCount: number, networkActivityCount: number) => void;
  className?: string;
}

const LogFileUploader: React.FC<LogFileUploaderProps> = ({ onLogsProcessed, className }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasUploadedData, setHasUploadedData] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      const content = await file.text();
      // Parse each line as a separate JSON object (handle newline-delimited JSON)
      const logs = content
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line));
      
      const { fileAccessLogs, logonActivityLogs, networkActivityLogs } = processUploadedLogs(logs);
      
      setHasUploadedData(true);
      onLogsProcessed(
        fileAccessLogs.length, 
        logonActivityLogs.length, 
        networkActivityLogs.length
      );
      
      toast({
        title: "Log file processed successfully",
        description: `Found ${fileAccessLogs.length} file access logs, ${logonActivityLogs.length} logon activity logs, and ${networkActivityLogs.length} network activity logs.`,
      });
    } catch (error) {
      console.error('Error processing log file:', error);
      toast({
        title: "Error processing log file",
        description: "Please make sure the file contains valid JSON data.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      // Reset the file input
      e.target.value = '';
    }
  };

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
      doc.text("This report contains analysis of uploaded log files", 20, 40);
      
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
          <FileJson className="h-5 w-5" />
          Log File Processor
        </CardTitle>
        <CardDescription>Upload JSON log files for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="w-full relative overflow-hidden"
              disabled={isProcessing}
              onClick={() => document.getElementById('log-file-input')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>{isProcessing ? "Processing..." : "Upload JSON Log File"}</span>
              <input 
                type="file" 
                id="log-file-input"
                accept=".json, .txt"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                disabled={isProcessing}
              />
            </Button>
            
            {hasUploadedData && (
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
            <p>Supported format: JSON logs with Type and Details fields</p>
            <p className="mt-1">Example: {'{"Type":"File Access","Details":{"Hostname":"User1","Date":"","Time Period":3,"Day":5,"Number of Files Accessed":9}}'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogFileUploader;
