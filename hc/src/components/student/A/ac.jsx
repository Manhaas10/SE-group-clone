import React from "react";
import { format } from "date-fns";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Pin, Bookmark, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export const AnnouncementCard = ({ announcement, onClick }) => {
  const { markAsRead, togglePin } = useAnnouncements();
  const { id, title, category, description, createdAt, isRead, isPinned } = announcement;
  
  const formattedDate = format(new Date(createdAt), "MMMM d, yyyy 'at' h:mm a");
  
  const handleClick = () => {
    if (!isRead) {
      markAsRead(id);
    }
    if (onClick) onClick();
  };
  
  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePin(id);
  };
  
  return (
    <div 
      className={cn(
        "announcement-card cursor-pointer group",
        !isRead && "border-l-4 border-l-nitc-blue"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <span className={`tag-${category.toLowerCase()}`}>{category}</span>
            {!isRead && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-nitc-blue/10 text-nitc-blue">
                New
              </span>
            )}
          </div>
          <h3 className="text-lg font-medium mb-1 group-hover:text-nitc-blue transition-colors">
            {title}
          </h3>
        </div>
        <button 
          onClick={handlePinClick}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            isPinned ? "text-nitc-blue bg-nitc-blue/10" : "text-gray-400 hover:bg-gray-100"
          )}
          aria-label={isPinned ? "Unpin announcement" : "Pin announcement"}
        >
          {isPinned ? <Bookmark size={18} fill="currentColor" /> : <Bookmark size={18} />}
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center text-xs text-gray-500 mt-3 gap-4">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
