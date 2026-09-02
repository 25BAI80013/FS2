import React, { memo } from "react";

function PostModal({ post, onDelete, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{post.title}</h2>

        <p>
          <strong>Platform:</strong> {post.platform}
        </p>

        <p>
          <strong>Scheduled:</strong>{" "}
          {new Date(post.start).toLocaleString()}
        </p>

        <p>{post.description}</p>

        <div className="modal-actions">
          <button onClick={() => onDelete(post.id)}>
            Delete
          </button>

          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PostModal);