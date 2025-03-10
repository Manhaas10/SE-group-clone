import { Calendar, User, Users } from "lucide-react";


const SkillPost = ({
  type,
  category,
  title,
  description,
  availability,
  participants,
  postedBy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full 
            ${type === "OFFERING" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
        >
          {type}
        </span>
        <span className="text-gray-500">{category}</span>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{availability}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{participants} participant(s)</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>Posted by: {postedBy}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillPost;
