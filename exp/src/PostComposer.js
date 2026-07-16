import React, { useState, useEffect } from "react";
import "./App.css";

const limits = {
  twitter: 280,
  instagram: 2200,
  linkedin: 3000,
};

function PostComposer() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts")) || [];
    setDrafts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const limit = platform ? limits[platform] : null;

  // ✅ HARD LIMIT INPUT
  const handleChange = (e) => {
    const value = e.target.value;
    if (!limit) {
      setText(value);
    } else {
      setText(value.slice(0, limit));
    }
  };

  const saveDraft = () => {
    if (!text.trim() || !platform) {
      alert("Write text and select platform!");
      return;
    }

    const newDraft = {
      text,
      platform,
      date: new Date().toLocaleString(),
    };

    if (editingIndex !== null) {
      const updated = [...drafts];
      updated[editingIndex] = newDraft;
      setDrafts(updated);
      setEditingIndex(null);
    } else {
      setDrafts([newDraft, ...drafts]);
    }

    setText("");
    setPlatform("");
  };

  const editDraft = (index) => {
    const draft = drafts[index];
    setText(draft.text);
    setPlatform(draft.platform);
    setEditingIndex(index);
  };

  const deleteDraft = (index) => {
    const updated = drafts.filter((_, i) => i !== index);
    setDrafts(updated);
  };

  return (
    <div className="container">
      <h2>Post Composer</h2>

      <textarea
        placeholder="Write your post..."
        value={text}
        onChange={handleChange}
        className="textarea"
      />

      {/* PLATFORM */}
      <div className="platforms">
        {["twitter", "instagram", "linkedin"].map((p) => (
          <label key={p}>
            <input
              type="radio"
              name="platform"
              checked={platform === p}
              onChange={() => setPlatform(p)}
            />
            <span>{p}</span>
          </label>
        ))}
      </div>

      {/* COUNTER */}
      {limit && (
        <p className="counter">
          {text.length}/{limit}
        </p>
      )}

      <button onClick={saveDraft}>
        {editingIndex !== null ? "Update Draft" : "Save Draft"}
      </button>

      <h3>Saved Drafts</h3>

      {drafts.length === 0 && <p>No drafts yet</p>}

      {drafts.map((draft, index) => (
        <div key={index} className="draft-card">
          <p>
            <strong>Platform:</strong> {draft.platform}
          </p>

          {/* ✅ TEXT FIX APPLIED HERE */}
          <p className="draft-text">{draft.text}</p>

          <small>{draft.date}</small>

          <div className="btn-group">
            <button onClick={() => editDraft(index)}>Edit</button>
            <button onClick={() => deleteDraft(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostComposer;