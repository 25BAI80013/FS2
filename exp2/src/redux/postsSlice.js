import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learning React",
      content: "Today I learned React components.",
      platform: "LinkedIn",
    },
    {
      id: 2,
      title: "Redux Toolkit",
      content: "State management is easy now!",
      platform: "Instagram",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    editPost: (state, action) => {
      const { id, title, content, platform } = action.payload;

      const post = state.posts.find((p) => p.id === id);

      if (post) {
        post.title = title;
        post.content = content;
        post.platform = platform;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  editPost,
} = postsSlice.actions;

export default postsSlice.reducer;