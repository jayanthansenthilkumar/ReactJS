
import React, { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Upload, List, Grid, ChevronRight, MoreVertical, File, FileText, Image, Archive, Video } from "lucide-react";
import FileCard from "@/components/ui/file-card";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: string;
  folder?: string;
}

const FileManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("date");
  const [searchQuery, setSearchQuery] = useState("");

  const mockFiles: FileItem[] = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "application/pdf",
      size: 2500000,
      lastModified: "Today, 10:42 AM",
      folder: "Documents"
    },
    {
      id: "2",
      name: "Vacation Photos.zip",
      type: "application/zip",
      size: 15700000,
      lastModified: "Yesterday, 6:30 PM",
      folder: "Photos"
    },
    {
      id: "3",
      name: "Meeting Notes.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 350000,
      lastModified: "Yesterday, 2:15 PM",
      folder: "Documents"
    },
    {
      id: "4",
      name: "Profile Picture.jpg",
      type: "image/jpeg",
      size: 850000,
      lastModified: "May 6, 9:21 AM",
      folder: "Photos"
    },
    {
      id: "5",
      name: "Company Logo.png",
      type: "image/png",
      size: 1200000,
      lastModified: "May 5, 3:45 PM",
      folder: "Work"
    },
    {
      id: "6",
      name: "Project Budget.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 450000,
      lastModified: "May 4, 11:32 AM",
      folder: "Documents"
    },
    {
      id: "7",
      name: "Presentation.pptx",
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 3800000,
      lastModified: "May 3, 5:20 PM",
      folder: "Work"
    },
    {
      id: "8",
      name: "Family Video.mp4",
      type: "video/mp4",
      size: 28500000,
      lastModified: "May 2, 2:10 PM",
      folder: "Videos"
    },
  ];

  const folders = ["All Files", "Documents", "Photos", "Videos", "Work"];
  const [activeFolder, setActiveFolder] = useState("All Files");

  const filteredFiles = mockFiles.filter((file) => {
    const matchesFolder = activeFolder === "All Files" || file.folder === activeFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "size") {
      return b.size - a.size;
    } else {
      // Sort by date (most recent first)
      return a.lastModified.localeCompare(b.lastModified) * -1;
    }
  });

  const handleFileAction = (action: string, fileId: string) => {
    toast({
      title: `File ${action}`,
      description: `File has been ${action.toLowerCase()} successfully`,
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Your file is being uploaded",
    });
  };

  const getFilesTypeStats = () => {
    const stats = {
      documents: 0,
      images: 0,
      archives: 0,
      videos: 0,
      others: 0,
    };

    mockFiles.forEach((file) => {
      if (file.type.includes("pdf") || file.type.includes("doc") || file.type.includes("text")) {
        stats.documents += file.size;
      } else if (file.type.includes("image")) {
        stats.images += file.size;
      } else if (file.type.includes("zip") || file.type.includes("rar")) {
        stats.archives += file.size;
      } else if (file.type.includes("video")) {
        stats.videos += file.size;
      } else {
        stats.others += file.size;
      }
    });

    return stats;
  };

  const fileTypeStats = getFilesTypeStats();

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const getTotalSize = () => {
    return mockFiles.reduce((total, file) => total + file.size, 0);
  };

  const getFolderIcon = (folderName: string) => {
    switch (folderName) {
      case "Documents":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "Photos":
        return <Image className="w-5 h-5 text-green-500" />;
      case "Videos":
        return <Video className="w-5 h-5 text-purple-500" />;
      case "Work":
        return <Archive className="w-5 h-5 text-amber-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <UserLayout title="File Manager">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => handleUpload()}
              className="w-full mb-4 bg-cloud-blue hover:bg-blue-600"
            >
              <Upload className="w-4 h-4 mr-2" /> Upload Files
            </Button>
            
            <div className="space-y-1">
              {folders.map((folder) => (
                <Button
                  key={folder}
                  variant={activeFolder === folder ? "secondary" : "ghost"}
                  className={`w-full justify-start ${
                    activeFolder === folder ? "bg-cloud-blue/10 font-medium" : ""
                  }`}
                  onClick={() => setActiveFolder(folder)}
                >
                  {folder === "All Files" ? (
                    <File className="w-5 h-5 mr-2" />
                  ) : (
                    getFolderIcon(folder)
                  )}
                  {folder}
                </Button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">Storage Overview</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Used Space</span>
                  <span className="font-medium">{formatBytes(getTotalSize())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Free Space</span>
                  <span className="font-medium">
                    {formatBytes((user?.storage?.total || 5000) * 1000000 - getTotalSize())}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-cloud-blue h-2.5 rounded-full"
                    style={{
                      width: `${
                        (getTotalSize() / ((user?.storage?.total || 5000) * 1000000)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {Math.round(
                    (getTotalSize() / ((user?.storage?.total || 5000) * 1000000)) * 100
                  )}% of {formatBytes((user?.storage?.total || 5000) * 1000000)}
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Documents</span>
                  </div>
                  <span>{formatBytes(fileTypeStats.documents)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Images</span>
                  </div>
                  <span>{formatBytes(fileTypeStats.images)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>Videos</span>
                  </div>
                  <span>{formatBytes(fileTypeStats.videos)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Archives</span>
                  </div>
                  <span>{formatBytes(fileTypeStats.archives)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    <span>Others</span>
                  </div>
                  <span>{formatBytes(fileTypeStats.others)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as any)}
              >
                <SelectTrigger className="w-auto">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>Sort</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className={`rounded-none ${
                    viewMode === "list"
                      ? "bg-cloud-blue hover:bg-blue-600"
                      : "hover:bg-transparent hover:text-gray-900"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className={`rounded-none ${
                    viewMode === "grid"
                      ? "bg-cloud-blue hover:bg-blue-600"
                      : "hover:bg-transparent hover:text-gray-900"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="font-medium text-gray-800">{activeFolder}</span>
            <span className="ml-auto">{sortedFiles.length} items</span>
          </div>

          {sortedFiles.length > 0 ? (
            <div>
              {viewMode === "list" ? (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {sortedFiles.map((file) => (
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onDelete={(id) => handleFileAction("deleted", id)}
                      onDownload={(id) => handleFileAction("downloaded", id)}
                      onShare={(id) => handleFileAction("shared", id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gray-100">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">No files found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any files matching your search
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default FileManager;
