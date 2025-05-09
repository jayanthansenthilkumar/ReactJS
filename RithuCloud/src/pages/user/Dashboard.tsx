
import React from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StorageProgress from "@/components/ui/storage-progress";
import FileCard from "@/components/ui/file-card";
import { HardDrive, Upload, Download, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const recentFiles = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "application/pdf",
      size: 2500000,
      lastModified: "Today, 10:42 AM",
    },
    {
      id: "2",
      name: "Vacation Photos.zip",
      type: "application/zip",
      size: 15700000,
      lastModified: "Yesterday, 6:30 PM",
    },
    {
      id: "3",
      name: "Meeting Notes.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 350000,
      lastModified: "Yesterday, 2:15 PM",
    },
    {
      id: "4",
      name: "Profile Picture.jpg",
      type: "image/jpeg",
      size: 850000,
      lastModified: "May 6, 9:21 AM",
    },
  ];

  const handleFileAction = (action: string, fileId: string) => {
    toast({
      title: `File ${action}`,
      description: `File has been ${action.toLowerCase()} successfully`,
    });
  };

  const storageStats = [
    {
      title: "Documents",
      used: 1200,
      percentage: 40,
    },
    {
      title: "Images",
      used: 800,
      percentage: 30,
    },
    {
      title: "Videos",
      used: 450,
      percentage: 20,
    },
    {
      title: "Others",
      used: 50,
      percentage: 10,
    },
  ];

  return (
    <UserLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Storage Overview</CardTitle>
              <CardDescription>
                Your storage usage and available space
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-cloud-blue/10 mr-4">
                  <HardDrive className="w-6 h-6 text-cloud-blue" />
                </div>
                <div className="flex-1">
                  <StorageProgress
                    used={user?.storage?.used || 2500}
                    total={user?.storage?.total || 5000}
                    showDetails={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {storageStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="font-semibold text-lg mt-1">
                      {stat.percentage}%
                    </p>
                    <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-cloud-blue rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Uploads</CardTitle>
                <CardDescription>
                  Files you've recently uploaded
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFiles.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onDelete={(id) => handleFileAction("deleted", id)}
                    onDownload={(id) => handleFileAction("downloaded", id)}
                    onShare={(id) => handleFileAction("shared", id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-3">
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uploaded</p>
                  <p className="font-semibold text-xl">64 Files</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-3">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Downloaded</p>
                  <p className="font-semibold text-xl">128 Files</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 mr-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p className="font-semibold">Today at 10:42 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {user?.storage?.plan === "free" && (
            <Card className="bg-gradient-to-br from-cloud-blue/10 to-cloud-lightBlue/20 border-cloud-blue/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">Upgrade to Pro</h3>
                <p className="text-sm mt-2 text-gray-600">
                  Get 50GB storage, faster uploads, and priority support.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    50GB of storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Larger file uploads (up to 5GB)
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-cloud-blue hover:bg-blue-600">
                  Upgrade Now for $9.99/month
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Storage Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-800">Optimize images</p>
                <p className="text-gray-600">
                  Compress images before uploading to save space.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Use ZIP files</p>
                <p className="text-gray-600">
                  Bundle multiple files together to save storage.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Remove duplicates</p>
                <p className="text-gray-600">
                  Delete duplicate files to free up space.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
