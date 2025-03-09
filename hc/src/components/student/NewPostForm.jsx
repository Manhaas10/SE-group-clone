import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const postTypes = [
  { id: "offering", label: "Offering Skill" },
  { id: "seeking", label: "Seeking Skill" },
];

const categories = [
  "Programming",
  "Music",
  "Sports",
  "Art",
  "Languages",
  "Academics",
  "Others",
];

const NewPostForm = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState("offering");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim() || !category || !availability.trim()) {
      toast.error("Please fill all the fields");
      return;
    }
    
    // In a real app, we would save the post to a database here
    // For now, we'll just show a success message and navigate back
    toast.success("Post created successfully!");
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-xl font-semibold mb-6">New Skill Sharing Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Post Type</label>
          <div className="flex space-x-4">
            {postTypes.map((type) => (
              <label 
                key={type.id} 
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="postType"
                  value={type.id}
                  checked={postType === type.id}
                  onChange={() => setPostType(type.id)}
                  className="h-4 w-4 text-nitc-blue focus:ring-nitc-blue border-gray-300"
                />
                <span className="text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex justify-between items-center form-input text-left"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {category || "Select category"}
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-200">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What skill are you offering/seeking?"
            className="form-input"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide more details about your skill sharing post"
            className="form-input form-textarea"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="When are you available? (e.g., Weekends, Evening 6-8 PM)"
            className="form-input"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-nitc-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
          >
            Create Post
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/")}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewPostForm;
