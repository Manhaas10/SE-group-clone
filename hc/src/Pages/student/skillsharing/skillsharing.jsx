import { useState } from "react";
import Header from "@/components/student/Header";
import { Button } from "@/components/ui/button";
import SkillPost from "@/components/student/SkillPost";
import NewPostForm from "@/components/student/NewPostForm";
import { Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-Toast";
import { useNavigate } from "react-router-dom";

// Sample initial data
const initialPosts = [
  {
    id: "1",
    type: "OFFERING",
    category: "Programming",
    title: "Python Programming Basics",
    description: "Can teach Python basics, including data structures and algorithms",
    availability: "Weekends",
    participants: 3,
    postedBy: "John Doe (A-304)",
  },
  {
    id: "2",
    type: "SEEKING",
    category: "Music",
    title: "Looking for Guitar Lessons",
    description: "Interested in learning acoustic guitar basics",
    availability: "Weekday Evenings",
    participants: 0,
    postedBy: "Jane Smith (B-205)",
  },
];

const Skill = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState("ALL");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle Back Button Navigation
  const handleBack = () => {
    if (showNewPostForm) {
      setShowNewPostForm(false); // Close the new post form
      navigate("/skill"); // Navigate to /skill
    } else {
      navigate("/dashboards"); // Navigate to dashboard
    }
  };

  const filteredPosts =
    filter === "ALL" ? posts : posts.filter((post) => post.type === filter);

  const handleAddPost = (data) => {
    const newPost = {
      id: Date.now().toString(),
      type: data.type,
      category: data.category,
      title: data.title,
      description: data.description,
      availability: data.availability,
      participants: 0,
      postedBy: "Manhaas (Your Room)",
    };

    setPosts((prev) => [newPost, ...prev]);
    setShowNewPostForm(false);
    toast({
      title: "Success!",
      description: "Your skill sharing post has been created.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
        </div>
      </div>
      <main className="app-container py-8 flex-1 flex flex-col items-center">
        <div className="w-full max-w-4xl px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold">Skill Sharing</h2>
              <p className="text-gray-500">Share your skills or learn from others</p>
            </div>
            <Button
            variant="outline"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white"
              onClick={() => setShowNewPostForm(true)}
            >
              <Plus className="h-5 w-5" />
              New Post
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
  <Button
    onClick={() => setFilter("ALL")}
    className={`rounded-md px-6 py-2 font-medium ${
      filter === "ALL"
        ? "bg-blue-600 text-white"
        : "bg-white border border-gray-300 text-gray-700"
    }`}
  >
    All Posts
  </Button>
  <Button
    onClick={() => setFilter("OFFERING")}
    className={`rounded-md px-6 py-2 font-medium ${
      filter === "OFFERING"
        ? "bg-blue-600 text-white"
        : "bg-white border border-gray-300 text-gray-700"
    }`}
  >
    Skills Offered
  </Button>
  <Button
    onClick={() => setFilter("SEEKING")}
    className={`rounded-md px-6 py-2 font-medium ${
      filter === "SEEKING"
        ? "bg-blue-600 text-white"
        : "bg-white border border-gray-300 text-gray-700"
    }`}
  >
    Skills Wanted
  </Button>
</div>


          {showNewPostForm ? (
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <NewPostForm
                  onClose={() => setShowNewPostForm(false)}
                  onSubmit={handleAddPost}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <SkillPost
                  key={post.id}
                  type={post.type}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  availability={post.availability}
                  participants={post.participants}
                  postedBy={post.postedBy}
                />
              ))}
              {filteredPosts.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center">
                  <p className="text-gray-500">No posts found. Create a new post to get started!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Skill;
