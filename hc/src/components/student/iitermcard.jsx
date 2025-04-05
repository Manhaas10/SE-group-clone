import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const ItemCard = ({ item }) => {
  const isLost = item.type === "LOST";
  const statusClass = isLost ? "bg-red-100 text-red-600 px-2 py-1 rounded-md" : "bg-green-100 text-green-600 px-2 py-1 rounded-md";
  const statusText = isLost ? "LOST" : "FOUND";

  const [showImageDialog, setShowImageDialog] = useState(false);

  // Fetch image from backend if it exists, else use a placeholder
  const imageSrc = item.image 
    ? item.image
    : "/public/image/1.jpg";

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium mt-2 mb-1">{item.title}</h3>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusClass)}>
                  {statusText}
                </span>
            
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex gap-4">
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={imageSrc}
                alt={`Image of ${item.title}`}
                className="w-full h-full object-cover rounded-md bg-gray-100 cursor-pointer"
                onClick={() => setShowImageDialog(true)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center text-xs text-gray-500">
              <MapPin size={14} className="mr-1" />
                <span className="mr-3">{item.location}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
              <span>{format(new Date(item.date), "MM/dd/yyyy")}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setShowImageDialog(true)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View Image
          </Button>
        </CardFooter>
      </Card>

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <button onClick={() => setShowImageDialog(false)}>
                <X className="h-5 w-5 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <div className="mt-4">
              <img
                src={imageSrc}
                alt={`Image of ${item.title}`}
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="mt-4 text-right">
              <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCard;
