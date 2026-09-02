import React, { useState } from "react";

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date) {
      return;
    }

    onAddPost({
      title,
      platform,
      start: date,
      description
    });

    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Instagram</option>
        <option>Facebook</option>
        <option>LinkedIn</option>
        <option>Twitter</option>
      </select>

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Post description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">
        Schedule Post
      </button>
    </form>
  );
}

export default PostForm;