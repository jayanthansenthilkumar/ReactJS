
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  File, 
  FileText, 
  Image, 
  FileArchive,
  Video,
  Music,
  MoreVertical,
  Download,
  Trash,
  Share
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FileCardProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: number;
    lastModified: string;
  };
  onDelete?: (id: string) => void;
  onDownload?: (id: string) => void;
  onShare?: (id: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onDelete, onDownload, onShare }) => {
  const getFileIcon = () => {
    switch (true) {
      case file.type.includes("image"):
        return <Image className="w-12 h-12 text-cloud-blue" />;
      case file.type.includes("pdf"):
        return <FileText className="w-12 h-12 text-red-500" />;
      case file.type.includes("video"):
        return <Video className="w-12 h-12 text-purple-500" />;
      case file.type.includes("audio"):
        return <Music className="w-12 h-12 text-green-500" />;
      case file.type.includes("zip") || file.type.includes("rar"):
        return <FileArchive className="w-12 h-12 text-amber-500" />;
      default:
        return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000000000).toFixed(1)} GB`;
  };

  return (
    <Card className="p-4 file-item flex items-center justify-between">
      <div className="flex items-center">
        {getFileIcon()}
        <div className="ml-4">
          <h3 className="font-medium text-gray-800 truncate max-w-[150px] sm:max-w-none">
            {file.name}
          </h3>
          <div className="text-sm text-gray-500">
            {formatFileSize(file.size)}
            <span className="text-gray-400 mx-1">•</span>
            {file.lastModified}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onDownload?.(file.id)}>
            <Download className="mr-2 h-4 w-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onShare?.(file.id)}>
            <Share className="mr-2 h-4 w-4" /> Share
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete?.(file.id)}
            className="text-red-500 focus:text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default FileCard;
