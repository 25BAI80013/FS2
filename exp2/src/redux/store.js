import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, platformReducer } from "./features";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformReducer,
  },
});