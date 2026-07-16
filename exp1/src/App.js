import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ Character limits per platform
  const limits = {
    twitter: 280,
    linkedin: 3000,
    instagram: 2200,
    facebook: 63206,
  };

  const limit = limits[platform];
  const isExceeded = limit && text.length > limit;

  // ✅ Handle text input with hard limit
  const handleChange = (e) => {
    const value = e.target.value;

    if (!limit) {
      setText(value);
      return;
    }

    // enforce limit
    setText(value.slice(0, limit));
  };

  // ✅ Save or update draft
  const saveDraft = () => {
    if (!text || !platform) return;

    const newDraft = { text, platform };

    if (editingIndex !== null) {
      const updated = [...drafts];
      updated[editingIndex] = newDraft;
      setDrafts(updated);
      setEditingIndex(null);
    } else {
      setDrafts([...drafts, newDraft]);
    }

    setText("");
    setPlatform("");
  };

  // ✅ Edit draft
  const editDraft = (index) => {
    setText(drafts[index].text);
    setPlatform(drafts[index].platform);
    setEditingIndex(index);
  };

  // ✅ Delete draft
  const deleteDraft = (index) => {
    const updated = drafts.filter((_, i) => i !== index);
    setDrafts(updated);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Social Media Post Composer</h1>

      {/* Platform Selector */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="">Select Platform</option>
        <option value="twitter">Twitter (280)</option>
        <option value="linkedin">LinkedIn (3000)</option>
        <option value="instagram">Instagram (2200)</option>
        <option value="facebook">Facebook (63206)</option>
      </select>

      <br /><br />

      {/* Text Area */}
      <textarea
        placeholder="Write your post..."
        value={text}
        onChange={handleChange}
        rows={5}
        cols={50}
      />

      {/* Character Counter */}
      {limit && (
        <p style={{ color: isExceeded ? "red" : "black" }}>
          {text.length} / {limit}
        </p>
      )}

      {/* Warning */}
      {isExceeded && (
        <p style={{ color: "red" }}>
          Character limit exceeded!
        </p>
      )}

      {/* Save Button */}
      <button onClick={saveDraft} disabled={!text || !platform}>
        {editingIndex !== null ? "Update Draft" : "Save Draft"}
      </button>

      <hr />

      {/* Draft List */}
      <h2>Saved Drafts</h2>

      {drafts.length === 0 && <p>No drafts yet</p>}

      {drafts.map((draft, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>Platform:</b> {draft.platform}</p>
          <p>{draft.text}</p>

          <button onClick={() => editDraft(index)}>Edit</button>
          <button onClick={() => deleteDraft(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}