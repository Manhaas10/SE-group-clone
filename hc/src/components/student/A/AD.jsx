import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { cn } from "@/lib/utils";

export const AnnouncementDashboardCard = () => {
  const navigate = useNavigate();
  const announcementContext = useAnnouncements();

  // Prevents crashing if the context is undefined
  if (!announcementContext) {
    console.error("useAnnouncements() returned undefined. Ensure it's inside the provider.");
    return null;
  }

  const { unreadCount = 0 } = announcementContext;

  const handleClick = () => {
    navigate("/announcements");
  };

  return (
    <div
      className="dashboard-card cursor-pointer group p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg"
      onClick={handleClick}
    >
      {/* Unread Notification Badge */}
      {unreadCount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          {unreadCount}
        </div>
      )}

      {/* Icon Section */}
      <div
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600",
          "group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
        )}
      >
        <Bell size={24} />
      </div>

      {/* Text Content */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Announcements</h3>
        <p className="text-sm text-gray-600">
          {unreadCount > 0
            ? `You have ${unreadCount} unread announcement${unreadCount > 1 ? "s" : ""}.`
            : "View all announcements and updates"}
        </p>
      </div>
    </div>
  );
};
