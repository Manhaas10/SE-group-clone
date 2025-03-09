import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/student/Header";
import SkillTabs from "@/components/student/SkillTabs";
import SkillCard from "@/components/student/SkillCard";
import { skillPosts } from "@/lib/data";

// type TabOption = "all" | "offered" | "wanted";

const Skill = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(skillPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPosts(skillPosts);
    } else if (activeTab === "offered") {
      setFilteredPosts(skillPosts.filter(post => post.type === "offering"));
    } else {
      setFilteredPosts(skillPosts.filter(post => post.type === "seeking"));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-nitc-gray">
      <Header />
      
      <main className="app-container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-1">Skill Sharing</h2>
            <p className="text-gray-600">Share your skills or learn from others</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link
              to="/new-post"
              className="inline-flex items-center gap-2 bg-nitc-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <PlusCircle size={18} />
              <span>New Post</span>
            </Link>
          </motion.div>
        </div>
        
        <SkillTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="h-48 bg-white/40 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredPosts.map((post, index) => (
                <SkillCard key={post.id} post={post} index={index} />
              ))}
              
              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-500 mb-4">No posts found in this category</p>
                  <Link
                    to="/new-post"
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

export default Skill;
