import {EntryRequestCard } from "./EntryRequestCard";
import { cn } from "@/lib/utils";


export const EntryRequestList = ({ requests, className }) => {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No late entry requests found.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {requests.map((request) => (
        <EntryRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
};
