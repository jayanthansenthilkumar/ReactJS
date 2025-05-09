
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StorageProgress from "@/components/ui/storage-progress";
import { Badge } from "@/components/ui/badge";

const AdminProfile = () => {
  const { user } = useAuth();
  
  return (
    <AdminLayout title="Profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-cloud-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold">
                  {user?.name.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name || 'Admin User'}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Administrator</Badge>
                    <span className="text-sm text-gray-500">ID: {user?.id || 'admin-123'}</span>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      defaultValue={user?.name || 'Admin User'}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      defaultValue={user?.email || 'admin@cloudcanvas.com'}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Input
                    id="role"
                    defaultValue="Administrator"
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500">
                    Administrator role has full access to all system features and settings.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-sm font-medium">
                    Current Password
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">
                      New Password
                    </label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <Button type="button" className="bg-cloud-blue hover:bg-blue-600">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <StorageProgress 
                used={user?.storage?.used || 5000}
                total={user?.storage?.total || 1000000}
              />
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">Total Size</p>
                  <p className="font-semibold">1 TB</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Files</p>
                  <p className="font-semibold">1,345</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-semibold">Admin</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-semibold">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Two-Factor Authentication</span>
                  <span className="text-red-500 text-sm">Disabled</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Enable 2FA
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Session Management</span>
                  <span className="text-green-600 text-sm">1 Active</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Sessions
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">API Access</span>
                  <span className="text-green-600 text-sm">Enabled</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
