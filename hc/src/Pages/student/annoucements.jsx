import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnnouncementFilters } from "@/components/student/A/AF";
import { AnnouncementsList } from "@/components/student/A/Al";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Announcementss = () => {
  const navigate = useNavigate();
  
  // Page transition effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 -ml-3 text-gray-600 hover:text-gray-900"
            onClick={() => navigate("/dashboards")}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-2">
            Stay updated with the latest announcements and news for hostel residents.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <AnnouncementFilters />
          <AnnouncementsList />
        </div>
      </div>
    </div>
  );
};

export default Announcementss;
