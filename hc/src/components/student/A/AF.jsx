import React from "react";
import { useAnnouncements } from "@/context/AnnouncementContext";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "General",
  "Maintenance",
  "Event",
  "Urgent",
  "Emergency",
];

export const AnnouncementFilters = () => {
  const { 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useAnnouncements();
  
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2.5 pl-10 text-sm rounded-lg border border-gray-300 focus:ring-nitc-blue focus:border-nitc-blue transition-all"
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap",
              category === selectedCategory
                ? category === "All"
                  ? "bg-gray-200 text-gray-800"
                  : `bg-tag-${category.toLowerCase()} text-tag-${category.toLowerCase()}-text`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nitc-blue",
              "transition-all duration-150 ease-in-out"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
