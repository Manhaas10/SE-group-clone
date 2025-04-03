import React, { useState, useEffect } from "react";
import { AnnouncementCard } from "./ac";
import { AnnouncementDetailModal } from "./AnnouncementDetailModal";
import { Inbox } from "lucide-react";

export const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // Fetch Announcements
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await api.get("/user/me", { withCredentials: true });
          console.log(response.data);
          setUser(response.data);
          setUsername(user.username);
        } catch (error) {
          console.error("Failed to fetch user :", error);
        }
      };
      fetchUser();
    }, []);
  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/announcements"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();

        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDetailModalOpen(true);
  };
  const filteredAnnouncements = announcements.filter((item) => {
    const categoryBlock = item.category.replace("Block ", ""); // Extract "A" from "Block A"
    return item.category === "All Blocks" || categoryBlock === user?.block;
  });

  if (loading) {
    return <p className="text-center text-gray-600">Loading announcements...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <Inbox size={40} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No announcements found</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are no announcements available at the moment.
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
