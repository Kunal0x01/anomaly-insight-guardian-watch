
import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileSearch, Clock, Users } from "lucide-react";

const InvestigationPage = () => {
  return (
    <>
      <Helmet>
        <title>Investigation | AnomalyGuard</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Investigation</h1>
            <Button variant="default">New Investigation</Button>
          </div>

          <div className="flex w-full items-center space-x-2 mb-6">
            <Input 
              type="text" 
              placeholder="Search by user, entity, alert ID or keyword..." 
              className="max-w-lg" 
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Cases</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileSearch className="h-5 w-5 text-primary" />
                          Investigation #{100 + i}
                        </CardTitle>
                        <CardDescription>
                          Created on April {i + 1}, 2025 - High Priority
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Subject</p>
                        <p>User ID: USR-{1000 + i}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Trigger</p>
                        <p>Multiple Failed Login Attempts</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <p className="text-amber-500 font-medium">In Progress</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileSearch className="h-5 w-5 text-primary" />
                        Investigation #98
                      </CardTitle>
                      <CardDescription>
                        Completed on March 28, 2025
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View Report</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Subject</p>
                      <p>User ID: USR-992</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Trigger</p>
                      <p>Unusual File Access Pattern</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <p className="text-green-500 font-medium">Resolved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="archived" className="mt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Archived Investigations</h3>
                <p className="text-muted-foreground max-w-md">
                  Archived investigations will appear here. You can archive completed cases for future reference.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default InvestigationPage;
