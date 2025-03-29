"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Paperclip } from "lucide-react"
import { toast } from "@/hooks/caretaker/use-Toast"
import AnnouncementModal from "@/components/caretaker/dashboard/AnnouncementModal"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Announcements = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true)
        const response = await api.get("/announcements")
        setAnnouncements(response.data)
      } catch (error) {
        console.error("Error fetching announcements:", error)
        toast({
          title: "Error",
          description: "Failed to load announcements",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const handleCloseModal = () => {
    setShowAnnouncementModal(false)
  }

  const handleSubmitAnnouncement = async (data) => {
    try {
      const announcementData = {
        title: data.title,
        content: data.content,
        category: data.type === "Block Specific" ? data.block || "" : data.type,
        has_attachment: !!data.attachment,
        attachment_url: data.attachment || null,
      }

      const response = await api.post("/announcements", announcementData)

      // Create a new announcement with the returned ID
      const newAnnouncement = {
        id: response.data.id,
        title: data.title,
        content: data.content,
        category: data.type === "Block Specific" ? data.block || "" : data.type,
        timestamp: new Date().toLocaleString(),
        has_attachment: !!data.attachment,
      }

      setAnnouncements([newAnnouncement, ...announcements])

      toast({
        title: "Announcement Created",
        description: `"${data.title}" has been posted successfully.`,
      })

      setShowAnnouncementModal(false)
    } catch (error) {
      console.error("Error creating announcement:", error)
      toast({
        title: "Error",
        description: "Failed to create announcement",
      })
    }
  }

  // Helper function to get badge color based on category
  const getBadgeClass = (category) => {
    if (category.includes("Block")) {
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    } else if (category === "General") {
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    } else if (category === "All Blocks") {
      return "bg-green-100 text-green-800 hover:bg-green-100"
    } else if (category === "Staff Only") {
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    }
    return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-3">
          <Button
            variant="ghost"
            className="mb-4 pl-0 text-muted-foreground shadow-md"
            onClick={() => navigate("/dashboardc")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-purple-600">Announcements</h1>
            <p className="text-muted-foreground mt-1">Manage and create announcements</p>
          </div>
          <Button
            onClick={() => setShowAnnouncementModal(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
          >
            <Plus size={16} />
            New Announcement
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">All Announcements</h2>

          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Loading announcements...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <Card key={announcement.id} className="overflow-hidden animate-fade-in">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(announcement.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getBadgeClass(announcement.category)}>{announcement.category}</Badge>

                        {announcement.has_attachment && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Paperclip size={12} className="mr-1" />
                            Attachment
                          </div>
                        )}
                      </div>

                      <p className="text-gray-700">{announcement.content}</p>
                    </CardContent>
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
      </div>

      {showAnnouncementModal && (
        <AnnouncementModal
          isOpen={showAnnouncementModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmitAnnouncement}
        />
      )}
    </div>
  )
}

export default Announcements

