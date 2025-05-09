
import React from "react";
import { Progress } from "@/components/ui/progress";

interface StorageProgressProps {
  used: number;
  total: number;
  showDetails?: boolean;
  className?: string;
  compact?: boolean;
}

const StorageProgress = ({
  used,
  total,
  showDetails = true,
  className = "",
  compact = false,
}: StorageProgressProps) => {
  const percentage = Math.min(Math.round((used / total) * 100), 100);
  
  const formatStorage = (bytes: number) => {
    if (bytes < 1000) return `${bytes} B`;
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`;
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`;
    return `${(bytes / 1000000000).toFixed(1)} GB`;
  };

  let progressColor = "bg-cloud-blue";
  if (percentage > 90) {
    progressColor = "bg-red-500";
  } else if (percentage > 70) {
    progressColor = "bg-amber-500";
  }

  return (
    <div className={`${className} ${compact ? "space-y-1" : "space-y-2"}`}>
      {showDetails && (
        <div className={`flex justify-between items-center ${compact ? "text-xs" : "text-sm"}`}>
          <span className="font-medium text-gray-700">
            {formatStorage(used)} of {formatStorage(total)} used
          </span>
          <span className={`font-bold ${
            percentage > 90 
              ? "text-red-500" 
              : percentage > 70 
                ? "text-amber-500" 
                : "text-cloud-blue"
          }`}>
            {percentage}%
          </span>
        </div>
      )}
      <div className="relative">
        <Progress 
          value={percentage} 
          className={`h-2 ${compact ? "h-1" : ""} w-full bg-gray-200 progress-animation`}
        />
        <div 
          className={`absolute top-0 left-0 h-2 ${compact ? "h-1" : ""} ${progressColor} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>
    </div>
  );
};

export default StorageProgress;
