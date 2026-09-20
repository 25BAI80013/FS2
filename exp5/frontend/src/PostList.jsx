import React, { useState } from 'react';

const PostList = ({ posts, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEditClick = (post) => {
    setEditingId(post.id);
    setEditContent(post.content);
  };

  // Save the changes but keep the post as a DRAFT
  const handleSaveDraftClick = (post) => {
    if (!editContent.trim()) return;

    onUpdate(post.id, {
      platform: post.platform,
      content: editContent.trim(),
      status: 'DRAFT'
    });

    setEditingId(null);
    setEditContent('');
  };

  // Save the changes AND publish the draft
  const handlePublishClick = (post) => {
    if (!editContent.trim()) return;

    onUpdate(post.id, {
      platform: post.platform,
      content: editContent.trim(),
      status: 'PUBLISHED'
    });

    setEditingId(null);
    setEditContent('');
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditContent('');
  };

  if (posts.length === 0) {
    return (
      <div className="no-posts">
        No posts yet. Start composing!
      </div>
    );
  }

  return (
    <div className="post-list">
      <h2>Recent Posts</h2>

      {posts.map((post) => {
        const isDraft = post.status === 'DRAFT';

        return (
          <div key={post.id} className="post-card">

            <div className="post-header">

              <div className="post-badges">

                <span
                  className={`platform-badge ${post.platform.toLowerCase()}`}
                >
                  {post.platform}
                </span>

                <span
                  className={`status-badge ${
                    isDraft ? 'draft' : 'published'
                  }`}
                >
                  {isDraft ? 'Draft' : 'Published'}
                </span>

              </div>

              <div className="post-actions">

                {editingId === post.id ? (
                  <>
                    {/* Keep as draft */}
                    {isDraft && (
                      <button
                        className="action-btn save"
                        onClick={() => handleSaveDraftClick(post)}
                      >
                        Save Draft
                      </button>
                    )}

                    {/* Publish the draft */}
                    {isDraft && (
                      <button
                        className="action-btn publish"
                        onClick={() => handlePublishClick(post)}
                      >
                        Post
                      </button>
                    )}

                    {/* Normal published post edit */}
                    {!isDraft && (
                      <button
                        className="action-btn save"
                        onClick={() => handleSaveDraftClick(post)}
                      >
                        Save
                      </button>
                    )}

                    <button
                      className="action-btn cancel"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditClick(post)}
                    >
                      Edit
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() => onDelete(post.id)}
                    >
                      Delete
                    </button>
                  </>
                )}

              </div>
            </div>

            <div className="post-body">

              {editingId === post.id ? (
                <textarea
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  rows="4"
                  className="edit-textarea"
                />
              ) : (
                <p>{post.content}</p>
              )}

            </div>

          </div>
        );
      })}
    </div>
  );
};

export default PostList;
