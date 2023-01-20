import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.js";
import { postsReducer } from "./slices/post.js";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
