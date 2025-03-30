import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/student/Header";
import SkillPost from "@/components/student/SkillPost";
import NewPostForm from "@/components/student/NewPostForm";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-Toast";
import api from "@/Pages/api/axios"; // API helper

const Skill = () => {
  const [posts, setPosts] = useState([]); // All posts
  const [userPosts, setUserPosts] = useState([]); // Posts created by logged-in user
  const [filteredPosts, setFilteredPosts] = useState([]); // Filtered posts
  const [filter, setFilter] = useState("ALL");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId")); // Get logged-in user ID

  // 🔄 Fetch all posts & user-specific posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch all posts
        const response = await api.get("/skillpost", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(response.data);
        setPosts(response.data);

        // Fetch only posts created by this user
        const userResponse = await api.get(`/skillpost/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserPosts(userResponse.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load skill posts",
          variant: "destructive",
        });
      }
    };

    fetchPosts();
  }, [userId]);

  // ✅ Handle New Post Creation
  const handleAddPost = async (data) => {
    try {
      const response = await api.post("/skillpost", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) => [response.data, ...prev]);
      setUserPosts((prev) => [response.data, ...prev]); // Update user's posts
      setShowNewPostForm(false);
      toast({ title: "Success!", description: "Your skill-sharing post has been created." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create post", variant: "destructive" });
    }
  };

  // ✅ Join a Skill Post
  const handleJoinPost = async (postId) => {
    try {
      await api.post(`/skillpost/${postId}/join`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { 
                ...post, 
                currentParticipants: post.currentParticipants + 1, 
                joinedUsers: [...(post.joinedUsers || []), userId] // Ensure it's always an array
              }
            : post
        )
      );
  
      toast({ title: "Joined!", description: "You have joined the skill-sharing session." });
    } catch (error) {
      console.error("Error joining skill post:", error);
      toast({ title: "Error", description: "Could not join post.", variant: "destructive" });
    }
  };
  

  // ❌ Leave a Skill Post
  const handleLeavePost = async (postId) => {
    try {
      await api.post(`/skillpost/${postId}/leave`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, currentParticipants: post.currentParticipants - 1, joinedUsers: post.joinedUsers.filter((id) => id !== userId) }
            : post
        )
      );

      toast({ title: "Left the post!", description: "You have left the skill-sharing session." });
    } catch (error) {
      toast({ title: "Error", description: "Could not leave post.", variant: "destructive" });
    }
  };

  // 🏷️ Update Filtered Posts when `filter` changes
  useEffect(() => {
    setFilteredPosts(
      filter === "ALL"
        ? posts
        : filter === "OFFERING"
        ? posts.filter((post) => post.postType === "OFFERING")
        : filter === "SEEKING"
        ? posts.filter((post) => post.postType === "SEEKING")
        : filter === "POST"
        ? userPosts // ✅ Use the fetched user-specific posts
        : filter === "JOINED"
        ? posts.filter((post) => post.joinedUsers?.includes(userId))
        : []
    );
  }, [filter, posts, userPosts, userId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate("/dashboards")} className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors">
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
            <Button variant="outline" className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white" onClick={() => setShowNewPostForm(true)}>
              <Plus className="h-5 w-5" /> New Post
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            {["ALL", "OFFERING", "SEEKING", "POST", "JOINED"].map((type) => (
              <Button key={type} onClick={() => setFilter(type)} className={`rounded-md px-6 py-2 font-medium ${filter === type ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700"}`}>
                {type === "ALL" ? "All Posts" : type === "OFFERING" ? "Skills Offered" : type === "SEEKING" ? "Skills Wanted" : type === "POST" ? "Posts By You" : "Joined Posts"}
              </Button>
            ))}
          </div>

          {showNewPostForm ? (
            <NewPostForm onClose={() => setShowNewPostForm(false)} onPostSuccess={handleAddPost} />
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <SkillPost key={post.id} {...post} onJoin={() => handleJoinPost(post.id)} onLeave={() => handleLeavePost(post.id)} userJoined={post.joinedUsers?.includes(userId)} />
            ))
          ) : (
            <p className="text-gray-500 text-center">No posts found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Skill;
