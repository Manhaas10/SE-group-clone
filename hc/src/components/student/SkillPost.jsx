import { useState } from "react";
import { Calendar, User, Users, Info } from "lucide-react";

const SkillPost = ({
  id,
  postType,
  category,
  title,
  description,
  timings,
  maxPeople,
  venue,
  currentParticipants,
  postedBy,
  onJoin,
  onLeave,
  userJoined,
}) => {
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // ✅ Handle Join
  const handleJoin = async () => {
    setLoading(true);
    await onJoin(id);
    setLoading(false);
  };

  // ❌ Handle Leave
  const handleLeave = async () => {
    setLoading(true);
    await onLeave(id);
    setLoading(false);
  };

  const isFull = currentParticipants >= maxPeople;

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300 flex flex-col">
      
      {/* Small Info Icon to Show Description */}
      <div
  className="absolute top-3 right-3 flex items-center gap-1 cursor-pointer"
  onMouseEnter={() => setShowDescription(true)}
  onMouseLeave={() => setShowDescription(false)}
>
  <Info className="h-5 w-5 text-gray-500 hover:text-gray-700" />
  <span className="text-xs text-gray-600">Description</span>
</div>

      {/* Small Floating Dialog Box */}
      {showDescription && (
        <div className="absolute top-8 right-3 bg-white shadow-lg border border-gray-300 p-3 rounded-md w-48 text-sm text-gray-700 z-50">
          {description}
        </div>
      )}

      {/* Post Type and Category */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full 
            ${postType === "OFFERING" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
        >
          {postType}
        </span>
        <span className="text-gray-500">{category}</span>
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      {/* Details & Button aligned in the same row */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{timings}</span>
            <span>{venue}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>
              {currentParticipants}/{maxPeople} participant(s)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Posted by: {postedBy}</span>
          </div>
        </div>

        {/* Join/Leave Button */}
        {userJoined ? (
          <button
            onClick={handleLeave}
            disabled={loading}
            className="text-sm px-3 py-1 rounded-md border bg-red-600 text-white border-red-600 hover:bg-red-700 transition-all"
          >
            {loading ? "Leaving..." : "Leave"}
          </button>
        ) : (
          <button
            onClick={handleJoin}
            disabled={loading || isFull}
            className={`text-sm px-3 py-1 rounded-md border transition-all ${
              isFull
                ? "bg-gray-400 text-white border-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Joining..." : isFull ? "Full" : "Join"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillPost;
