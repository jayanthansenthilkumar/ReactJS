
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { 
  Users, 
  HardDrive, 
  Upload, 
  UserCheck,
  FileText
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const storageData = [
    { name: 'Jan', used: 120, free: 250 },
    { name: 'Feb', used: 150, free: 220 },
    { name: 'Mar', used: 180, free: 190 },
    { name: 'Apr', used: 230, free: 140 },
    { name: 'May', used: 290, free: 80 },
    { name: 'Jun', used: 310, free: 60 },
    { name: 'Jul', used: 350, free: 20 },
  ];

  const userActivity = [
    { name: 'Mon', uploads: 10, downloads: 15 },
    { name: 'Tue', uploads: 20, downloads: 18 },
    { name: 'Wed', uploads: 15, downloads: 12 },
    { name: 'Thu', uploads: 25, downloads: 24 },
    { name: 'Fri', uploads: 22, downloads: 30 },
    { name: 'Sat', uploads: 12, downloads: 5 },
    { name: 'Sun', uploads: 8, downloads: 3 },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "Uploaded", item: "financial-report.pdf", time: "2 minutes ago" },
    { id: 2, user: "Sarah Johnson", action: "Downloaded", item: "product-images.zip", time: "15 minutes ago" },
    { id: 3, user: "Mike Williams", action: "Shared", item: "project-proposal.docx", time: "1 hour ago" },
    { id: 4, user: "Emily Davis", action: "Deleted", item: "old-backups.zip", time: "3 hours ago" },
    { id: 5, user: "Alex Turner", action: "Uploaded", item: "presentation.pptx", time: "5 hours ago" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,245"
          icon={<Users className="w-6 h-6 text-cloud-blue" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Storage Used"
          value="1.2 TB"
          icon={<HardDrive className="w-6 h-6 text-indigo-500" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Files Uploaded"
          value="8,392"
          icon={<Upload className="w-6 h-6 text-green-500" />}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="946"
          icon={<UserCheck className="w-6 h-6 text-amber-500" />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Storage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="used" fill="#3B82F6" name="Storage Used (GB)" />
                <Bar dataKey="free" fill="#93C5FD" name="Storage Free (GB)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uploads" stroke="#3B82F6" name="Uploads" />
                <Line type="monotone" dataKey="downloads" stroke="#10B981" name="Downloads" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center">
                  <div className="bg-cloud-gray rounded-full p-2 mr-4">
                    <FileText className="w-5 h-5 text-cloud-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.user} {activity.action.toLowerCase()} <span className="font-semibold">{activity.item}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.action === "Uploaded" ? "bg-green-100 text-green-800" :
                    activity.action === "Downloaded" ? "bg-blue-100 text-blue-800" :
                    activity.action === "Shared" ? "bg-purple-100 text-purple-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {activity.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
