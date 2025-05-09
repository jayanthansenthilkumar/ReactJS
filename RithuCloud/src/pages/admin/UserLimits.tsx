
import React from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardDrive, Users, Activity, DownloadCloud, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanDetails {
  name: string;
  maxStorage: number;
  maxBandwidth: number;
  maxFileSize: number;
  price: number;
}

const planDetails: Record<string, PlanDetails> = {
  free: {
    name: "Free",
    maxStorage: 5000, // 5GB in MB
    maxBandwidth: 10000, // 10GB in MB
    maxFileSize: 100, // 100MB
    price: 0,
  },
  pro: {
    name: "Pro",
    maxStorage: 50000, // 50GB in MB
    maxBandwidth: 100000, // 100GB in MB
    maxFileSize: 5000, // 5GB in MB
    price: 9.99,
  }
};

const UserLimitsPage = () => {
  const { toast } = useToast();
  
  const formatStorage = (mb: number) => {
    if (mb < 1000) return `${mb} MB`;
    return `${(mb / 1000).toFixed(1)} GB`;
  };

  const handleUpdatePlan = () => {
    toast({
      title: "Plan settings updated",
      description: "The changes will be applied to all users on this plan",
    });
  };

  return (
    <AdminLayout title="User Limits">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h4 className="mt-2 text-3xl font-bold">1,245</h4>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">Pro: 382</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span className="text-xs">Free: 863</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Storage Used</p>
                <h4 className="mt-2 text-3xl font-bold">1.2 TB</h4>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={68} className="h-2" />
              <div className="mt-1 text-xs text-gray-500 flex justify-between">
                <span>68% of capacity</span>
                <span>2 TB limit</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Bandwidth Used</p>
                <h4 className="mt-2 text-3xl font-bold">4.5 TB</h4>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Downloads: 2.8 TB</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs">Uploads: 1.7 TB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="free" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="free">Free Plan</TabsTrigger>
            <TabsTrigger value="pro">Pro Plan</TabsTrigger>
          </TabsList>
        </div>
        
        {["free", "pro"].map((plan) => (
          <TabsContent value={plan} key={plan} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl flex items-center">
                      {planDetails[plan].name} Plan
                      <Badge className={cn(
                        "ml-2",
                        plan === "pro" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      )}>
                        {plan === "pro" ? "$9.99/month" : "Free"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {plan === "free" 
                        ? "Basic plan with limited storage and features" 
                        : "Premium plan with advanced features and more storage"}
                    </CardDescription>
                  </div>
                  <Button onClick={handleUpdatePlan}>Update Plan</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Storage Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-600">Max Storage</h4>
                          <HardDrive className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold">
                          {formatStorage(planDetails[plan].maxStorage)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Per user</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-600">Max Bandwidth</h4>
                          <Activity className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold">
                          {formatStorage(planDetails[plan].maxBandwidth)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Per month</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-600">Max File Size</h4>
                          <UploadCloud className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold">
                          {formatStorage(planDetails[plan].maxFileSize)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Per file</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Usage Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Storage Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Documents</span>
                              <span>42%</span>
                            </div>
                            <Progress value={42} className="h-2" indicatorClassName="bg-blue-500" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Images</span>
                              <span>28%</span>
                            </div>
                            <Progress value={28} className="h-2" indicatorClassName="bg-green-500" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Videos</span>
                              <span>18%</span>
                            </div>
                            <Progress value={18} className="h-2" indicatorClassName="bg-amber-500" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Other</span>
                              <span>12%</span>
                            </div>
                            <Progress value={12} className="h-2" indicatorClassName="bg-purple-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Upload/Download Stats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 rounded-full bg-blue-100 mr-3">
                                <UploadCloud className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Total Uploads</p>
                                <p className="text-sm text-gray-500">This month</p>
                              </div>
                            </div>
                            <p className="font-bold text-xl">
                              {plan === "pro" ? "2.3 TB" : "780 GB"}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="p-2 rounded-full bg-green-100 mr-3">
                                <DownloadCloud className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium">Total Downloads</p>
                                <p className="text-sm text-gray-500">This month</p>
                              </div>
                            </div>
                            <p className="font-bold text-xl">
                              {plan === "pro" ? "4.1 TB" : "1.2 TB"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </AdminLayout>
  );
};

export default UserLimitsPage;

// Helper function
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
