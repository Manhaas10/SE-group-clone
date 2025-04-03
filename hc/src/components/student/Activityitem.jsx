import React from "react";
import { cn } from "@/lib/utils";

const ActivityItem = ({ color, title, content, time, className }) => {
  return (
    <div className={cn("flex items-start gap-3 py-4 border-b border-gray-200", className)}>
      {/* Status Dot */}
      <div
        className={cn(
          "h-3 w-3 rounded-full mt-1.5",
          color === "complaint" && "bg-purple-500",
          color === "lost" && "bg-blue-500",
          color === "entry" && "bg-green-500",
          color === "announcement" && "bg-yellow-500"
        )}
      />

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-gray-700">{content}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
