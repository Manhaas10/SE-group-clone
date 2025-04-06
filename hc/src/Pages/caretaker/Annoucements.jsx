import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Calendar, Paperclip } from "lucide-react";
import AnnouncementModal from "@/components/caretaker/dashboard/AnnouncementModal"
import { toast } from "@/hooks/caretaker/use-Toast";
import api from "../api/axios"

const Index = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        toast({
          title: "Error",
          description: "Failed to load announcements",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleCloseModal = () => {
    setShowAnnouncementModal(false);
  };

  const handleSubmitAnnouncement = async (data) => {
    try {
      const announcementData = {
        title: data.title,
        content: data.content,
        category: data.type === "Block Specific" ? data.block || "" : data.type,
        has_attachment: !!data.attachment,
        attachment_url: data.attachment || null,
      };

      const response = await api.post("/announcements", announcementData);

      const newAnnouncement = {
        id: response.data.id,
        title: data.title,
        content: data.content,
        category: data.type === "Block Specific" ? data.block || "" : data.type,
        timestamp: new Date().toISOString(), // better to store in ISO format
        has_attachment: !!data.attachment,
      };

      setAnnouncements([newAnnouncement, ...announcements]);

      toast({
        title: "Announcement Created",
        description: `"${data.title}" has been posted successfully.`,
      });

      setShowAnnouncementModal(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast({
        title: "Error",
        description: "Failed to create announcement",
      });
    }
  };

  const getBadgeClass = (category) => {
    if (category.includes("Block")) {
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    } else if (category === "General") {
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    } else if (category === "All Blocks") {
      return "bg-green-100 text-green-800 hover:bg-green-100";
    } else if (category === "Staff Only") {
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    }
    return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-600"
            onClick={() => navigate("/dashboardc")} // or the appropriate route
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-purple-600">Announcements</h1>
              <p className="text-gray-500 mt-1">Manage and create announcements</p>
            </div>
            <Button
              onClick={() => setShowAnnouncementModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
            >
              <Plus size={16} />
              New Announcement
            </Button>
          </div>

          {/* Section title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Announcements</h2>

          {/* Announcements list */}
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Loading announcements...</p>
            </div>
          ) : (
            <div className="space-y-4 mb-10">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <Card
                  key={announcement.id}
                  className="p-6 bg-white hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
                >
                
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <Badge className={getBadgeClass(announcement.category)}>
                            {announcement.category}
                          </Badge>

                          {announcement.has_attachment && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Paperclip size={12} className="mr-1" />
                              Attachment
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700 mt-1">{announcement.content}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(announcement.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No announcements found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {showAnnouncementModal && (
          <AnnouncementModal
            isOpen={showAnnouncementModal}
            onClose={handleCloseModal}
            onSubmit={handleSubmitAnnouncement}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
