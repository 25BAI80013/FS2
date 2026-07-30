import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/features";


function AddPost() {

  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms.list
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
        content,
        platform,
      })
    );

    setTitle("");
    setContent("");
    setPlatform("Instagram");
  };

  return (
    <div className="form-container">
      <h2>Add New Post</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {platforms.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <button type="submit">
          Add Post
        </button>

      </form>
    </div>
  );
}

export default AddPost;