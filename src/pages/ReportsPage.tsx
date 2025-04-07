
import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, Calendar, BarChart2, Users, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ReportsPage = () => {
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
              <Select defaultValue="weekly">
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
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Generate Report
              </Button>
            </div>
          </div>

          <Tabs defaultValue="recent">
            <TabsList>
              <TabsTrigger value="recent">Recent Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
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
