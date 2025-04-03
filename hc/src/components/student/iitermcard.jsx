import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ItemCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLost = item.type === "LOST";
  const statusClass = isLost ? "bg-red-100 text-red-600 px-2 py-1 rounded-md" : "bg-green-100 text-green-600 px-2 py-1 rounded-md";
  const statusText = isLost ? "LOST" : "FOUND";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="bg-white rounded-xl border border-border/60 overflow-hidden transition-all hover:shadow-card animate-fade-in cursor-pointer" onClick={() => item.image && setIsOpen(true)}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusClass)}>
                  {statusText}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {item.category}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-medium mt-2 mb-1">{item.title}</h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin size={14} className="mr-1" />
              <span className="mr-3">{item.location}</span>
              <span>{format(new Date(item.date), "MM/dd/yyyy")}</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {item.image && item.image.data && (
  <DialogContent className="max-w-lg p-4">
    <img 
      src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(item.image.data)))}`}

      alt="Uploaded item" 
      className="w-full h-auto rounded-md" 
    />
  </DialogContent>
)}

    </Dialog>
  );
};

export default ItemCard;
