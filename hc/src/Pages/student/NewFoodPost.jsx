import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const postTypes = [
  { id: "offering", label: "Offering Food" },
  { id: "requesting", label: "Requesting Food" },
];

const NewFoodPost = () => {
  const navigate = useNavigate();
  const [postType, setPostType] = useState("offering");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, we would save the post to a database here
    toast.success("Food sharing post created successfully!");
    setTimeout(() => navigate("/food-sharing"), 500);
  };

  return (
    <div className="min-h-screen bg-nitc-gray">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="app-container py-4 flex items-center">
          <Link 
            to="/food-sharing"
            className="mr-3 inline-flex items-center gap-2 text-gray-700"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
        </div>
      </header>
      
      <main className="app-container py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-xl font-semibold mb-2">New Food Sharing Post</h2>
            <p className="text-gray-600 mb-6">Share extra food or request what you need</p>
            
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
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="form-input"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the food item"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price or 'Free'"
                  className="form-input"
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/food-sharing")}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  className="bg-[#14151c] hover:bg-black/80"
                >
                  Post
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NewFoodPost;
