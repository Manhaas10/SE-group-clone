import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2 } from "lucide-react";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { cn } from "@/lib/utils";

export const AnnouncementDetailModal = ({
  announcement,
  isOpen,
  onOpenChange,
  isAdmin = false,
}) => {
  const { togglePin, deleteAnnouncement } = useAnnouncements();

  if (!announcement) return null;

  console.log("Raw timestamp from API:", announcement.timestamp); // Debugging log

  let parsedDate = announcement.timestamp ? new Date(announcement.timestamp) : null;

  console.log("Parsed Date Object:", parsedDate); // Debugging log

  const formattedDate =
    parsedDate && !isNaN(parsedDate)
      ? format(parsedDate, "MMMM d, yyyy") // ✅ Show only date
      : "Invalid Date";

  console.log("Final Formatted Date:", formattedDate); // Debugging log

  const handlePin = () => {
    togglePin(announcement.id);
  };

  const handleDelete = () => {
    deleteAnnouncement(announcement.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className={`tag-${announcement.category.toLowerCase()}`}>
              {announcement.category}
            </span>
          </div>
          <DialogTitle className="text-xl font-semibold mt-1">
            {announcement.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Posted on {formattedDate}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <p className="text-gray-700 whitespace-pre-line">
            {announcement.description}
          </p>
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-2",
              announcement.isPinned && "bg-nitc-blue/10 text-nitc-blue border-nitc-blue/20"
            )}
            onClick={handlePin}
          >
            <Bookmark
              size={16}
              className={announcement.isPinned ? "fill-current" : ""}
            />
            {announcement.isPinned ? "Unpin" : "Pin"}
          </Button>

          {isAdmin && (
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
