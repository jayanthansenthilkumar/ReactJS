
import React, { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import StorageProgress from "@/components/ui/storage-progress";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  storageUsed: number;
  storageLimit: number;
  plan: "free" | "pro";
  status: "active" | "inactive";
  joinedAt: string;
}

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "storage" | "plan">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();

  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      storageUsed: 2500,
      storageLimit: 5000,
      plan: "free",
      status: "active",
      joinedAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      storageUsed: 8500,
      storageLimit: 10000,
      plan: "pro",
      status: "active",
      joinedAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      storageUsed: 1200,
      storageLimit: 5000,
      plan: "free",
      status: "inactive",
      joinedAt: "2023-03-05",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      storageUsed: 7800,
      storageLimit: 10000,
      plan: "pro",
      status: "active",
      joinedAt: "2023-02-10",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      storageUsed: 4200,
      storageLimit: 5000,
      plan: "free",
      status: "active",
      joinedAt: "2023-04-12",
    },
    {
      id: "6",
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
      storageUsed: 9200,
      storageLimit: 10000,
      plan: "pro",
      status: "active",
      joinedAt: "2023-01-25",
    },
  ];

  const handleSort = (column: "name" | "storage" | "plan") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...mockUsers]
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "storage") {
        return sortOrder === "asc"
          ? a.storageUsed - b.storageUsed
          : b.storageUsed - a.storageUsed;
      } else {
        // sort by plan
        if (a.plan === b.plan) return 0;
        if (sortOrder === "asc") {
          return a.plan === "pro" ? 1 : -1;
        } else {
          return a.plan === "pro" ? -1 : 1;
        }
      }
    });

  const upgradeUser = (userId: string) => {
    toast({
      title: "User upgraded",
      description: "User has been upgraded to Pro plan",
    });
  };

  const deactivateUser = (userId: string) => {
    toast({
      title: "User deactivated",
      description: "User has been deactivated successfully",
    });
  };

  return (
    <AdminLayout title="Users">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>All Users</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      User
                      <ArrowUpDown className={cn(
                        "ml-1 h-4 w-4",
                        sortBy === "name" ? "opacity-100" : "opacity-40"
                      )} />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort("storage")}
                  >
                    <div className="flex items-center">
                      Storage Usage
                      <ArrowUpDown className={cn(
                        "ml-1 h-4 w-4",
                        sortBy === "storage" ? "opacity-100" : "opacity-40"
                      )} />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer"
                    onClick={() => handleSort("plan")}
                  >
                    <div className="flex items-center">
                      Plan
                      <ArrowUpDown className={cn(
                        "ml-1 h-4 w-4",
                        sortBy === "plan" ? "opacity-100" : "opacity-40"
                      )} />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-60">
                      <StorageProgress
                        used={user.storageUsed}
                        total={user.storageLimit}
                        compact
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={cn(
                          user.plan === "pro"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
                        )}
                      >
                        {user.plan === "pro" ? "Pro" : "Free"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          user.status === "active"
                            ? "border-green-500 text-green-600"
                            : "border-red-500 text-red-600"
                        )}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {user.plan === "free" && (
                            <DropdownMenuItem onClick={() => upgradeUser(user.id)}>
                              Upgrade to Pro
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deactivateUser(user.id)}
                            className="text-red-600"
                          >
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default UsersPage;
