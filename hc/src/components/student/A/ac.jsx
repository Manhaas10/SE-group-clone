import React from "react";
import { format } from "date-fns";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Bookmark, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const AnnouncementCard = ({ announcement, onClick }) => {
  const { markAsRead, togglePin } = useAnnouncements();
  const { id, title, category, description, timestamp, isRead, isPinned } = announcement;

  console.log("Raw timestamp from API:", timestamp); // Debugging log

  let parsedDate = timestamp ? new Date(timestamp) : null;

  console.log("Parsed Date Object:", parsedDate); // Debugging log

  const formattedDate = parsedDate && !isNaN(parsedDate)
    ? format(parsedDate, "MMMM d, yyyy") // ✅ Show only date
    : "Invalid Date";

  console.log("Final Formatted Date:", formattedDate); // Debugging log

  const handleClick = () => {
    if (!isRead) markAsRead(id);
    onClick?.();
  };

  const handlePinClick = (e) => {
    e.stopPropagation();
    togglePin(id);
  };

  return (
    <div
      className={cn(
        "announcement-card cursor-pointer group p-4 border rounded-lg shadow-sm bg-white transition hover:shadow-md",
        !isRead && "border-l-4 border-blue-500"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex gap-2 items-center mb-1">
            <span className={`tag-${category?.toLowerCase()}`}>{category}</span>
            {!isRead && (
              <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                New
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
            {title}
          </h3>
        </div>
        <button
          onClick={handlePinClick}
          className={cn(
            "p-2 rounded-full transition",
            isPinned ? "text-blue-600 bg-blue-100" : "text-gray-400 hover:bg-gray-100"
          )}
          aria-label={isPinned ? "Unpin announcement" : "Pin announcement"}
        >
          {isPinned ? <Bookmark size={18} fill="currentColor" /> : <Bookmark size={18} />}
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>

      <div className="flex items-center text-xs text-gray-500 mt-3 gap-4">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
