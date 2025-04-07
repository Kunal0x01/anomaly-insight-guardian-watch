
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, FileText, AlertTriangle, Calendar, Clock, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchResults(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Search | AnomalyGuard</title>
      </Helmet>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-6">Search</h1>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Unified Search</CardTitle>
                <CardDescription>
                  Search across users, events, alerts, and entities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex gap-4 items-end">
                  <div className="flex-1 space-y-1">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search by user ID, alert ID, hostname, IP..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Search in..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                        <SelectItem value="alerts">Alerts</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="files">Files</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit">Search</Button>
                  </div>
                </form>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                  <Button variant="link" size="sm">Advanced Search</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {searchResults && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Search Results</h2>
                <span className="text-sm text-muted-foreground">15 results for "{searchQuery}"</span>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Results (15)</TabsTrigger>
                  <TabsTrigger value="users">Users (4)</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts (6)</TabsTrigger>
                  <TabsTrigger value="events">Events (5)</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4 mt-6">
                  {/* User Result Example */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">User: Kunal</CardTitle>
                          <CardDescription>User ID: USR-1042 • Last Activity: Today, 9:32 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Department</p>
                          <p>Engineering</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                          <p className="text-amber-500 font-medium">Medium (65/100)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Status</p>
                          <p className="text-green-500">Active</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alert Result Example */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Alert: Multiple Failed Login Attempts</CardTitle>
                          <CardDescription>Alert ID: ALT-2042 • Generated: Today, 8:45 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">User</p>
                          <p>Kunal (USR-1042)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Severity</p>
                          <p className="text-red-500 font-medium">High</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Status</p>
                          <p className="text-amber-500">Under Investigation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Event Result Example */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Event: File Access</CardTitle>
                          <CardDescription>Event ID: EVT-6042 • Timestamp: Today, 8:30 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">User</p>
                          <p>Kunal (USR-1042)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Action</p>
                          <p>Accessed confidential file</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Location</p>
                          <p>192.168.1.25</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="users" className="mt-6">
                  {/* User-specific results would go here */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">User: Kunal</CardTitle>
                          <CardDescription>User ID: USR-1042 • Last Activity: Today, 9:32 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Department</p>
                          <p>Engineering</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Risk Score</p>
                          <p className="text-amber-500 font-medium">Medium (65/100)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Status</p>
                          <p className="text-green-500">Active</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="alerts" className="mt-6">
                  {/* Alert-specific results would go here */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <AlertTriangle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Alert: Multiple Failed Login Attempts</CardTitle>
                          <CardDescription>Alert ID: ALT-2042 • Generated: Today, 8:45 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">User</p>
                          <p>Kunal (USR-1042)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Severity</p>
                          <p className="text-red-500 font-medium">High</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Status</p>
                          <p className="text-amber-500">Under Investigation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="events" className="mt-6">
                  {/* Event-specific results would go here */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Event: File Access</CardTitle>
                          <CardDescription>Event ID: EVT-6042 • Timestamp: Today, 8:30 AM</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">User</p>
                          <p>Kunal (USR-1042)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Action</p>
                          <p>Accessed confidential file</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Location</p>
                          <p>192.168.1.25</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {!searchResults && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Search for Anything</h3>
              <p className="text-muted-foreground max-w-md">
                Enter keywords, IDs, or names to search across users, alerts, events, and more.
              </p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default SearchPage;
