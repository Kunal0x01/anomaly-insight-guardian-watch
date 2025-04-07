
import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Mail, 
  Globe, 
  Palette, 
  Users
} from "lucide-react";

const SettingsPage = () => {
  return (
    <>
      <Helmet>
        <title>Settings | AnomalyGuard</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <Button>Save Changes</Button>
          </div>

          <Tabs defaultValue="profile">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <TabsList className="flex flex-col w-full h-auto bg-transparent space-y-1">
                  <TabsTrigger 
                    value="profile" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    <span>Appearance</span>
                  </TabsTrigger>
                  <Separator className="my-2" />
                  <TabsTrigger 
                    value="system" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span>System</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="teams" 
                    className="justify-start w-full px-3 py-2 h-9"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span>Teams</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1">
                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Manage your profile information and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue="admin@anomalyguard.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Input id="role" defaultValue="Security Administrator" readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input id="department" defaultValue="Security Operations" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive email alerts for high priority events</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dashboard Alerts</Label>
                            <p className="text-sm text-muted-foreground">Show notification badges in the dashboard</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Weekly Reports</Label>
                            <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline">Change Password</Button>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Active Sessions</Label>
                        <div className="rounded-md border p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">Last active: Just now</p>
                            </div>
                            <Shield className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how the dashboard looks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="justify-start">
                              <span className="h-4 w-4 rounded-full bg-foreground mr-2" />
                              Light
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <span className="h-4 w-4 rounded-full bg-background border mr-2" />
                              Dark
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <span className="h-4 w-4 rounded-full bg-gradient-to-r from-background to-foreground mr-2" />
                              System
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="system" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Settings</CardTitle>
                      <CardDescription>Configure global system settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        These settings affect the entire AnomalyGuard system
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Automatic Updates</Label>
                            <p className="text-sm text-muted-foreground">Keep the system updated with the latest security patches</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>System Logs</Label>
                            <p className="text-sm text-muted-foreground">Retain detailed system logs for 90 days</p>
                          </div>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="teams" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Management</CardTitle>
                      <CardDescription>Manage team members and permissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Team Members</h3>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </div>
                        <div className="border rounded-md divide-y">
                          <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Admin User</p>
                                <p className="text-sm text-muted-foreground">admin@anomalyguard.com</p>
                              </div>
                            </div>
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                              Admin
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
