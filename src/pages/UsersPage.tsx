
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usersData } from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getRiskBadgeClass = (riskScore: number) => {
    if (riskScore >= 0.7) return "bg-anomaly-high/10 text-anomaly-high border-anomaly-high/40";
    if (riskScore >= 0.4) return "bg-anomaly-medium/10 text-anomaly-medium border-anomaly-medium/40";
    return "bg-anomaly-low/10 text-anomaly-low border-anomaly-low/40";
  };

  const getRiskLabel = (riskScore: number) => {
    if (riskScore >= 0.7) return "High Risk";
    if (riskScore >= 0.4) return "Medium Risk";
    return "Low Risk";
  };

  const getStatusBadgeClass = (status: string) => {
    return status === "online" 
      ? "bg-green-500/10 text-green-400 border-green-500/40" 
      : "bg-gray-500/10 text-gray-400 border-gray-500/40";
  };

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users & Entities</h1>
          <p className="text-muted-foreground">
            Monitor and investigate user behavior
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filter</span>
        </Button>
        <div className="flex-1 md:text-right">
          <span className="text-sm text-muted-foreground">
            {filteredUsers.length} users
          </span>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Anomalies</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const lastActive = new Date(user.lastActive);
              const formattedDate = lastActive.toLocaleDateString();
              const formattedTime = lastActive.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            user.riskScore >= 0.7 ? "bg-anomaly-high" :
                            user.riskScore >= 0.4 ? "bg-anomaly-medium" : "bg-anomaly-low"
                          )}
                          style={{ width: `${user.riskScore * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{Math.round(user.riskScore * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.anomalies > 0 ? (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          user.anomalies >= 3 ? "bg-anomaly-high/10 text-anomaly-high border-anomaly-high/40" : 
                          "bg-anomaly-medium/10 text-anomaly-medium border-anomaly-medium/40"
                        )}
                      >
                        {user.anomalies} detected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-anomaly-low/10 text-anomaly-low border-anomaly-low/40">
                        None
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{formattedDate}</div>
                      <div className="text-sm text-muted-foreground">{formattedTime}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusBadgeClass(user.status)}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
