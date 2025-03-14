
import React from 'react';
import { 
  User, 
  MessageSquare, 
  Package, 
  Users, 
  Clock, 
  Utensils 
} from 'lucide-react';
import Card from './Card';
import Header from './Header';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
const Dashboard= () => {
  const username = "Manhaas";
  const totalNotifications = 2; // Sum of all card notifications
  const navigate=useNavigate();
  const handleCardClick = (title) => {
    toast(`${title} card clicked`, {
      description: "This feature is coming soon!",
      duration: 3000,
    });
    
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header username={username} notificationCount={totalNotifications} />
      
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* Profile Card */}
          <Card
            title="Profile"
            description="View and edit your profile details"
            icon={<User size={22} className="text-nitc-blue" />}
            iconBgColor="bg-nitc-light-blue"
            onClick={() => navigate('/profile')}
            style={{ animationDelay: "0ms" }}
            className="shadow-[0_4px_10px_rgba(0,0,255,0.5)]"
          />
          
          {/* Complaints Card */}
          <Card
            title="Complaints"
            description="Register and track your complaints"
            icon={<MessageSquare size={22} className="text-purple-500" />}
            iconBgColor="bg-light-purple"
            onClick={() => navigate('/complaints')}
            style={{ animationDelay: "100ms" }}
            className="shadow-[0_4px_10px_rgba(128,0,128,0.5)]"
          />
          
          {/* Lost & Found Card */}
          <Card
            title="Lost & Found"
            description="Report lost items or mark found ones"
            icon={<Package size={22} className="text-green-500" />}
            iconBgColor="bg-nitc-light-green"
            onClick={() => navigate('/LandF')}
            style={{ animationDelay: "200ms" }}
            className="shadow-[0_4px_10px_rgba(0,128,0,0.5)]"
          />
          
          {/* Skill Sharing Card */}
          <Card
            title="Skill Sharing"
            description="Join clubs and collaborate with peers"
            icon={<Users size={22} className="text-yellow-500" />}
            iconBgColor="bg-nitc-light-yellow"
            onClick={() => navigate("/skill")}
            style={{ animationDelay: "300ms" }}
            className="shadow-[0_4px_10px_rgba(255,215,0,0.5)]"
          />
          
          {/* Late Entry Card */}
          <Card
            title="Late Entry"
            description="Submit and track late entry requests"
            icon={<Clock size={22} className="text-purple-500" />}
            iconBgColor="bg-nitc-light-purple"
            onClick={() => navigate("/late")}
            style={{ animationDelay: "400ms" }}
            className="shadow-[0_4px_10px_rgba(128,0,128,0.5)]"
          />
          
          {/* Food Sharing Card */}
          <Card
            title="Food Sharing"
            description="Buy, sell, or share food items"
            icon={<Utensils size={22} className="text-red-500" />}
            iconBgColor="bg-nitc-light-red"
            onClick={() => navigate("/food")}
            style={{ animationDelay: "500ms" }}
            className="shadow-[0_4px_10px_rgba(255,0,0,0.5)] /* Pure Red */
"
          />
        </div>
      </main>
      
      {/* <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2023 NITC HostelConnect. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
