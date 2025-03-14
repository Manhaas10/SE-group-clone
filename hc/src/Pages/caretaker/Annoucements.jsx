import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BellRing, Plus, Paperclip } from 'lucide-react';
import { toast } from '@/hooks/caretaker/use-Toast';
import Header from '@/components/caretaker/dashboard/Header';
import AnnouncementModal from '@/components/caretaker/dashboard/AnnouncementModal';
import { ChevronLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Announcements = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  
  // Sample announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'Scheduled Power Maintenance',
      content: 'There will be a scheduled power outage for maintenance work in all blocks from 2:00 PM to 4:00 PM tomorrow.',
      category: 'General',
      timestamp: '3/15/2024, 10:00:00 AM',
    },
    {
      id: '2',
      title: 'Block A Water Tank Cleaning',
      content: 'The water tank cleaning for Block A will be conducted on Monday. Water supply will be interrupted from 9 AM to 2 PM.',
      category: 'Block A',
      timestamp: '3/14/2024, 2:30:00 PM',
    },
    {
      id: '3',
      title: 'Fire Safety Drill Notice',
      content: 'A mandatory fire safety drill will be conducted next week. All residents are required to participate.',
      category: 'General',
      timestamp: '3/13/2024, 9:15:00 AM',
      hasAttachment: true,
    },
    {
      id: '4',
      title: 'Block C Plumbing Maintenance',
      content: 'Emergency plumbing maintenance work will be carried out in Block C tomorrow morning. Please ensure access to bathrooms.',
      category: 'Block C',
      timestamp: '3/12/2024, 4:45:00 PM',
    },
  ]);

  const handleCloseModal = () => {
    setShowAnnouncementModal(false);
  };

  const handleSubmitAnnouncement = (data) => {
    // Create a new announcement
    const newAnnouncement = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      category: data.type === 'Block Specific' ? data.block || '' : data.type,
      timestamp: new Date().toLocaleString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    
    toast({
      title: "Announcement Created",
      description: `"${data.title}" has been posted successfully.`
    });
    
    setShowAnnouncementModal(false);
  };

  // Helper function to get badge color based on category
  const getBadgeClass = (category) => {
    if (category.includes('Block')) {
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    } else if (category === 'General') {
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
    } else if (category === 'All Blocks') {
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    } else if (category === 'Staff Only') {
      return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
    }
    return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-3">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 text-muted-foreground shadow-md"
            onClick={() => navigate('/dashboardc')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
          </div>
          {/* <header className="w-full bg-[#F0F8FF] shadow-md p-3 rounded-lg "> */}
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
        
        {/* </header> */}

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">All Announcements</h2>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="overflow-hidden animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <span className="text-sm text-muted-foreground">{announcement.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getBadgeClass(announcement.category)}>
                      {announcement.category}
                    </Badge>
                    
                    {announcement.hasAttachment && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Paperclip size={12} className="mr-1" />
                        Attachment
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
  );
};

export default Announcements;
