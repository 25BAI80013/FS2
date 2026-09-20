import React, { useState } from 'react';

const WORD_LIMITS = {
  Twitter: 50,
  Instagram: 100,
  Facebook: 200
};

const PostComposer = ({ onPostCreate, onError }) => {
  const [platform, setPlatform] = useState('Twitter');
  const [content, setContent] = useState('');

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const handleContentChange = (e) => {
    const text = e.target.value;
    const words = countWords(text);
    const limit = WORD_LIMITS[platform];

    if (words > limit) {
      onError(
        `Word limit reached for ${platform}! Maximum allowed is ${limit} words.`
      );

      const truncatedText = text
        .trim()
        .split(/\s+/)
        .slice(0, limit)
        .join(' ');

      setContent(truncatedText + (text.endsWith(' ') ? ' ' : ''));
    } else {
      onError(null);
      setContent(text);
    }
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
    setContent('');
    onError(null);
  };

  const savePost = (status) => {
    if (!content.trim()) {
      onError('Please write some content before saving.');
      return;
    }

    onPostCreate({
      platform,
      content: content.trim(),
      status
    });

    setContent('');
    onError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePost('PUBLISHED');
  };

  const handleSaveDraft = () => {
    savePost('DRAFT');
  };

  return (
    <div className="composer-card">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Platform</label>

          <select value={platform} onChange={handlePlatformChange}>
            <option value="Twitter">Twitter (50 words)</option>
            <option value="Instagram">Instagram (100 words)</option>
            <option value="Facebook">Facebook (200 words)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Post Content</label>

          <textarea
            rows="5"
            placeholder="What's on your mind?"
            value={content}
            onChange={handleContentChange}
          />

          <div className="word-count">
            Words: {countWords(content)} / {WORD_LIMITS[platform]}
          </div>
        </div>

        <div className="composer-actions">
          <button
            type="button"
            className="draft-btn"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>

          <button type="submit" className="primary-btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComposer;