import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/student/Header";
import FilterTabs from "@/components/student/filtercard";
import ItemCard from "@/components/student/iitermcard";
import { MOCK_ITEMS} from "@/types";
import { ArrowLeft} from 'lucide-react';
// import { useNavigate } from "react-router-dom";
const LostAndFound = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  
  const filteredItems = MOCK_ITEMS.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.type === activeFilter;
  });
  const navigate=useNavigate();

  return (
<div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={()=>navigate('/dashboards')} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
        </div>
      </div>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Lost & Found</h1>
            <p className="text-muted-foreground">
              Report lost items or help others find their belongings
            </p>
          </div>
          
          <Link to="/newr" className="mt-4 sm:mt-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center">
              <Plus size={18} className="mr-1" />
              New Report
            </Button>
          </Link>
        </div>
        
        <FilterTabs 
          activeFilter={activeFilter} 
          onChange={setActiveFilter} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-muted-foreground">
                No items found
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try changing your filter or create a new report
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LostAndFound;
