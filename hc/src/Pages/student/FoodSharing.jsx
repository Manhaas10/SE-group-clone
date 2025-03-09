import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { foodPosts } from "@/lib/data";
import FoodCard from "@/components/student/FoodCard";

const FoodSharing = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-nitc-gray flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/')} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-nitc-blue">NITC HostelConnect</h1>
        </div>
      </div>
      
      <main className="app-container py-8 max-w-3xl mx-auto flex-1">
        <div className="flex justify-end mb-6">
          <Link
            to="/new-food-post"
            className="inline-flex items-center gap-2 bg-[#14151c] text-white px-4 py-2 rounded-md hover:bg-black/80 transition-colors duration-200"
          >
            <PlusCircle size={18} />
            <span>New Post</span>
          </Link>
        </div>     
        {isLoading ? (
          <div className="space-y-4 max-w-2xl mx-auto">
            {[1, 2].map((n) => (
              <div 
                key={n} 
                className="h-40 bg-white/40 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {foodPosts.map((post, index) => (
                <FoodCard key={post.id} post={post} index={index} />
              ))}
              
              {foodPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 mb-4">No food sharing posts yet</p>
                  <Link
                    to="/new-food-post"
                    className="text-nitc-blue hover:underline"
                  >
                    Create the first post
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default FoodSharing;
