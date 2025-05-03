
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailReportFormProps {
  reportTitle: string;
  reportType: string;
}

const EmailReportForm: React.FC<EmailReportFormProps> = ({ reportTitle, reportType }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    subject: `Security Report: ${reportTitle} (${reportType})`,
    message: `Please find attached the ${reportType} security report for your review.\n\nThis report contains important information about potential security threats and anomalies identified in our systems.`
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailData.to) {
      toast({
        title: "Email Required",
        description: "Please enter at least one recipient email address.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      
      toast({
        title: "Report Email Sent",
        description: `The security report has been sent to ${emailData.to.split(',').length} recipient(s).`,
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Mail className="mr-2 h-4 w-4" /> Email Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Security Report</DialogTitle>
          <DialogDescription>
            Send this security report to stakeholders via email
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="to">To <span className="text-destructive">*</span></Label>
            <Input
              id="to"
              name="to"
              placeholder="recipient@example.com"
              value={emailData.to}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground">Separate multiple emails with commas</p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="cc">CC</Label>
            <Input
              id="cc"
              name="cc"
              placeholder="cc@example.com"
              value={emailData.cc}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={emailData.subject}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Add a message..."
              value={emailData.message}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Sending..." : "Send Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailReportForm;
