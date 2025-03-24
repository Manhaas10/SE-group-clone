
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { cn } from "@/lib/utils";

export const AnnouncementDashboardCard = () => {
  const navigate = useNavigate();
  const { unreadCount } = useAnnouncements();
  
  return (
    <div 
      className="dashboard-card cursor-pointer group"
      onClick={() => navigate("/announcements")}
    >
      {unreadCount > 0 && (
        <div className="notification-badge animate-pulse-soft">
          {unreadCount}
        </div>
      )}
      
      <div className={cn(
        "nitc-icon-container bg-nitc-blue/10 text-nitc-blue",
        "group-hover:bg-nitc-blue group-hover:text-white transition-all duration-300"
      )}>
        <Bell size={24} />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-1">Announcements</h3>
        <p className="text-sm text-gray-600">
          {unreadCount 
            ? `You have ${unreadCount} unread announcement${unreadCount > 1 ? 's' : ''}`
            : "View all announcements and updates"}
        </p>
      </div>
    </div>
  );
};
