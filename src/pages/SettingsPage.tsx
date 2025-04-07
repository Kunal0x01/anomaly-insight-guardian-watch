
import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, Bell, Lock, User, Users, Mail, Shield, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> System Information
            </Button>
          </div>

          <Tabs defaultValue="general">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-64">
                <TabsList className="flex flex-col h-auto w-full p-0 bg-transparent">
                  <TabsTrigger
                    value="general"
                    className="justify-start w-full px-4 py-2 h-10"
                  >
                    <Settings className="mr-2 h-4 w-4" /> General
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start w-full px-4 py-2 h-10"
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start w-full px-4 py-2 h-10"
                  >
                    <Lock className="mr-2 h-4 w-4" /> Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="justify-start w-full px-4 py-2 h-10"
                  >
                    <Users className="mr-2 h-4 w-4" /> User Management
                  </TabsTrigger>
                  <TabsTrigger
                    value="integration"
                    className="justify-start w-full px-4 py-2 h-10"
                  >
                    <Globe className="mr-2 h-4 w-4" /> Integrations
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1">
                <TabsContent value="general" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>
                        Manage your system preferences and display settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="system-name">System Name</Label>
                        <Input id="system-name" defaultValue="AnomalyGuard" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Default Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time (ET)</SelectItem>
                            <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                            <SelectItem value="cet">Central European Time (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Display Settings</Label>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable dark mode for the interface
                            </p>
                          </div>
                          <Switch id="dark-mode" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="compact-mode">Compact Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Display more information with less spacing
                            </p>
                          </div>
                          <Switch id="compact-mode" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Configure how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Alert Notifications</h3>
                        <div className="space-y-2">
                          {[
                            {id: "high-alerts", label: "High Severity Alerts", description: "Critical security events requiring immediate attention"},
                            {id: "medium-alerts", label: "Medium Severity Alerts", description: "Potential security concerns to be reviewed"},
                            {id: "low-alerts", label: "Low Severity Alerts", description: "Minor anomalies for awareness"},
                          ].map((alert) => (
                            <div key={alert.id} className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label htmlFor={alert.id}>{alert.label}</Label>
                                <p className="text-sm text-muted-foreground">
                                  {alert.description}
                                </p>
                              </div>
                              <Switch id={alert.id} defaultChecked={alert.id !== "low-alerts"} />
                            </div>
                          ))}
                        </div>
                        
                        <Separator />
                        
                        <h3 className="text-lg font-medium">Delivery Methods</h3>
                        <div className="space-y-2">
                          {[
                            {id: "email-notif", label: "Email Notifications", description: "Receive alerts via email", icon: Mail},
                            {id: "browser-notif", label: "Browser Notifications", description: "Show desktop notifications", icon: Bell},
                            {id: "slack-notif", label: "Slack Integration", description: "Send alerts to Slack channels", icon: Globe},
                          ].map((method) => (
                            <div key={method.id} className="flex items-center justify-between">
                              <div className="flex items-start gap-3">
                                <method.icon className="h-5 w-5 text-primary mt-0.5" />
                                <div className="space-y-0.5">
                                  <Label htmlFor={method.id}>{method.label}</Label>
                                  <p className="text-sm text-muted-foreground">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                              <Switch id={method.id} defaultChecked={method.id !== "slack-notif"} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Configure system security and access controls
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Authentication</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">
                                Require MFA for all users
                              </p>
                            </div>
                            <Switch id="mfa" defaultChecked />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="password-policy">Password Policy</Label>
                            <Select defaultValue="strong">
                              <SelectTrigger id="password-policy">
                                <SelectValue placeholder="Select policy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard (8+ chars)</SelectItem>
                                <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                                <SelectItem value="very-strong">Very Strong (14+ chars, special chars)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="session-timeout">Session Timeout</Label>
                            <Select defaultValue="30">
                              <SelectTrigger id="session-timeout">
                                <SelectValue placeholder="Select timeout" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="240">4 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <h3 className="text-lg font-medium">Access Controls</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="ip-restriction">IP Address Restrictions</Label>
                              <p className="text-sm text-muted-foreground">
                                Limit access to specific IP ranges
                              </p>
                            </div>
                            <Switch id="ip-restriction" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="audit-logging">Enhanced Audit Logging</Label>
                              <p className="text-sm text-muted-foreground">
                                Track all user actions in detail
                              </p>
                            </div>
                            <Switch id="audit-logging" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>
                        Manage system users and their permissions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-4">
                        <Button>
                          <User className="mr-2 h-4 w-4" /> Add User
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Shield className="mr-2 h-4 w-4" /> Roles
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="mr-2 h-4 w-4" /> Groups
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border">
                        <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium border-b">
                          <div>User</div>
                          <div>Email</div>
                          <div>Role</div>
                          <div>Status</div>
                          <div>Actions</div>
                        </div>
                        
                        {[
                          {name: "Admin User", email: "admin@example.com", role: "Administrator", status: "Active"},
                          {name: "John Analyst", email: "john@example.com", role: "Security Analyst", status: "Active"},
                          {name: "Sarah Thompson", email: "sarah@example.com", role: "Read Only", status: "Inactive"},
                          {name: "Michael Chen", email: "michael@example.com", role: "Security Analyst", status: "Active"},
                        ].map((user, i) => (
                          <div key={i} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm border-b">
                            <div className="font-medium">{user.name}</div>
                            <div>{user.email}</div>
                            <div>{user.role}</div>
                            <div className={user.status === "Active" ? "text-green-500" : "text-muted-foreground"}>
                              {user.status}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Disable</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integration" className="space-y-4 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integrations</CardTitle>
                      <CardDescription>
                        Connect with external systems and services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          {
                            name: "SIEM Integration",
                            description: "Connect with Security Information and Event Management systems",
                            connected: true,
                            icon: Shield,
                          },
                          {
                            name: "Active Directory",
                            description: "Connect with your organization's Active Directory",
                            connected: true,
                            icon: Users,
                          },
                          {
                            name: "Email Server",
                            description: "Configure SMTP settings for email notifications",
                            connected: true,
                            icon: Mail,
                          },
                          {
                            name: "Slack",
                            description: "Send alerts and notifications to Slack channels",
                            connected: false,
                            icon: Globe,
                          },
                          {
                            name: "API Access",
                            description: "Manage API keys and access for third-party integrations",
                            connected: false,
                            icon: Lock,
                          },
                        ].map((integration, i) => (
                          <div key={i} className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                                <integration.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {integration.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {integration.connected ? (
                                <>
                                  <div className="flex items-center text-sm text-green-500">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                    Connected
                                  </div>
                                  <Button variant="outline" size="sm">Configure</Button>
                                </>
                              ) : (
                                <Button size="sm">Connect</Button>
                              )}
                            </div>
                          </div>
                        ))}
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
