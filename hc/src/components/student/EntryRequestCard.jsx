import { format } from "date-fns";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";


export const EntryRequestCard = ({ request, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md",
      className
    )}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <h3 className="font-medium">{format(new Date(request.timestamp), "PPpp")}</h3>
        <StatusBadge status={request.status} />
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-3">Reason:  {request.reason}</p>
    </div>
  );
};
