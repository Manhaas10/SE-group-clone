import React, { useState } from "react";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { AnnouncementCard } from "./ac";
import { AnnouncementDetailModal } from "./AnnouncementDetailModal";
import { Inbox } from "lucide-react";

export const AnnouncementsList = () => {
  const { filteredAnnouncements } = useAnnouncements();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDetailModalOpen(true);
  };
  
  if (filteredAnnouncements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <Inbox size={40} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No announcements found</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no announcements matching your current filters.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredAnnouncements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onClick={() => handleAnnouncementClick(announcement)}
        />
      ))}
      
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
};
