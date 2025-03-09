
import Header from "../components//student/Header";
import NewPostForm from "../components/student/NewPostForm";

const NewPost = () => {
  return (
    <div className="min-h-screen bg-nitc-gray">
      <Header />
      
      <main className="app-container py-8">
        <div className="max-w-2xl mx-auto">
          <NewPostForm />
        </div>
      </main>
    </div>
  );
};

export default NewPost;