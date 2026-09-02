import React, { useCallback, useMemo, useState } from "react";
import Calendar from "./components/Calendar";
import PostForm from "./components/PostForm";
import PostModal from "./components/PostModal";
import Stats from "./components/Stats";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Instagram Campaign",
      platform: "Instagram",
      start: "2026-09-05T10:00:00",
      description: "Launch campaign post"
    },
    {
      id: "2",
      title: "LinkedIn Update",
      platform: "LinkedIn",
      start: "2026-09-07T14:00:00",
      description: "Share project update"
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const addPost = useCallback((post) => {
    setPosts((currentPosts) => [
      ...currentPosts,
      {
        ...post,
        id: Date.now().toString()
      }
    ]);
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== id)
    );
    setSelectedPost(null);
  }, []);

  const updatePostDate = useCallback((id, newDate) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? { ...post, start: newDate }
          : post
      )
    );
  }, []);

  const totalPosts = useMemo(() => posts.length, [posts]);

  const platforms = useMemo(() => {
    return new Set(posts.map((post) => post.platform)).size;
  }, [posts]);

  return (
    <div className="app">
      <header>
        <h1>Social Media Post Scheduler</h1>
        <p>Schedule, manage and optimize your social media posts</p>
      </header>

      <Stats
        totalPosts={totalPosts}
        platforms={platforms}
      />

      <PostForm onAddPost={addPost} />

      <Calendar
        posts={posts}
        onSelectPost={setSelectedPost}
        onUpdatePostDate={updatePostDate}
      />

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onDelete={deletePost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default App;