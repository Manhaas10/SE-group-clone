import React from 'react';
import { toast } from "@/hooks/caretaker/use-Toast";
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/caretaker/dashboard/Header';
import SummaryCard from '@/components/caretaker/dashboard/SummaryCard';
import ActionCard from '@/components/caretaker/dashboard/ActionCard';
import ActivityItem from '@/components/caretaker/dashboard/ActivityItem';
import AnnouncementModal from '@/components/caretaker/dashboard/AnnouncementModal';
import { 
  MessageSquare, 
  Search, 
  Clock, 
  BellRing, 
  Plus 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
const Dashc = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = React.useState(false);

  // In a real app, we would fetch this data from an API
  const summaryData = [
    { title: 'Pending Complaints', count: 12, icon: <MessageSquare size={20} />, variant: 'complaint'  },
    { title: 'Lost Items', count: 8, icon: <Search size={20} />, variant: 'lost'  },
    { title: 'Entry Requests', count: 5, icon: <Clock size={20} />, variant: 'entry'  },
    { title: 'Announcements', count: 3, icon: <BellRing size={20} />, variant: 'announcement'  },
  ];

  const activityItems = [
    { color: 'complaint' , content: 'New complaint from Room 304 regarding plumbing', time: '2m ago' },
    { color: 'lost' , content: 'Lost item reported: Calculator in Library', time: '15m ago' },
    { color: 'entry' , content: 'Late entry request approved for Student ID: 2021BTech1234', time: '1h ago' },
  ];
  const navigate = useNavigate();
  const handleAction = (section) => {
    const routes = {
      announcements: '/announcements',
      complaints: '/comps',
      lostfound: '/lndf',
      entryrequests: '/l',
    };

    if (routes[section.toLowerCase()]) {
      navigate(routes[section.toLowerCase()]);
    } else {
      toast({
        title: `Navigating to ${section}`,
        description: `You are being redirected to the ${section} section.`,
      });
    }
  };

  const handleNewPost = () => {
    setShowAnnouncementModal(true);
  };

  const handleCloseModal = () => {
    setShowAnnouncementModal(false);
  };

  const handleSubmitAnnouncement = (data) => {
    toast({
      title: "Announcement Created",
      description: `"${data.title}" has been posted successfully.`
    });
    setShowAnnouncementModal(false);
    // In a real app, this would submit the announcement data to an API
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
    <div className="container mx-auto px-4 py-6 max-w-7xl">
    <header className="w-full bg-[#F0F8FF] shadow-md p-3 rounded-lg ">
        <Header />
      </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {summaryData.map((item, index) => (
            <SummaryCard
              key={item.title}
              title={item.title}
              count={item.count}
              icon={item.icon}
              variant={item.variant}
              animationDelay={`animate-delay-${index * 100}`
            }
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ActionCard
            title="Complaints"
            description="Manage and respond to student complaints"
            icon={<MessageSquare size={20} />}
            variant="complaint"
            onAction={() => handleAction('complaints')}
            animationDelay="animate-delay-100"
          />
          
          <ActionCard
            title="Lost & Found"
            description="Track and verify lost & found items"
            icon={<Search size={20} />}
            variant="lost"
            onAction={() => handleAction('lostfound')}
            animationDelay="animate-delay-200"
          />
          
          <ActionCard
            title="Late Entry Requests"
            description="Review and approve late entry requests"
            icon={<Clock size={20} />}
            variant="entry"
            onAction={() => handleAction('entryrequests')}
            animationDelay="animate-delay-300"
          />
          
          <ActionCard
            title="Announcements"
            description="Post notices to students"
            icon={<BellRing size={20} />}
            variant="announcement"
            onAction={() => handleAction('announcements')}
            onSecondaryAction={handleNewPost}
            secondaryButtonText="New Post"
            animationDelay="animate-delay-400"
            
          />
        </div>

        <div className="mt-10">
          <div className="glass p-6 rounded-xl shadow-md p-3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} className="text-muted-foreground" />
              Recent Activity
            </h2>
            <div className="divide-y">
              {activityItems.map((item, index) => (
                <ActivityItem
                  key={index}
                  color={item.color}
                  content={item.content}
                  time={item.time}
                  className={`animate-delay-${index * 100}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <footer className="mt-8 py-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Hostel Management System. All rights reserved.</p>
        </footer>
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

export default Dashc;
