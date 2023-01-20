import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axiosInstance.get("/posts");
  return data;
});

export const fetchPopularPosts = createAsyncThunk(
  "/posts/fetchPopularPosts",
  async () => {
    const { data } = await axiosInstance.get("/posts/popular");
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => await axiosInstance.delete(`/posts/${id}`)
);

export const fetchRemovePostsAll = createAsyncThunk(
  "/posts/fetchRemovePostAll",
  async () => await axiosInstance.delete(`/posts/`)
);

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  const { data } = await axiosInstance.get("/tags");
  return data;
});

export const fetchComment = createAsyncThunk(
  "/posts/fetchComment",
  async () => {
    const { data } = await axiosInstance.get("/comment");
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  postsPopular: {
    items: [],
    status: "loading",
  },
  comments: {
    commentsList: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: {
    // get Posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // get popular Posts
    [fetchPopularPosts.pending]: (state) => {
      state.postsPopular.items = [];
      state.postsPopular.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.postsPopular.items = action.payload;
      state.postsPopular.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.postsPopular.items = [];
      state.postsPopular.status = "error";
    },
    // get Tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // delete Post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state?.posts?.items?.filter(
        (obj) => obj?._id !== action?.meta?.arg
      );
      state.postsPopular.items = state?.postsPopular?.items?.filter(
        (obj) => obj?._id !== action?.meta?.arg
      );
    },
    // delete Posts All
    [fetchRemovePostsAll.pending]: (state) => {
      state.posts.items = [];
      state.postsPopular = [];
    },
    // get comments
    [fetchComment.pending]: (state) => {
      state.comments.commentsList = [];
      state.comments.status = "loading";
    },
    [fetchComment.fulfilled]: (state, action) => {
      state.comments.commentsList = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComment.rejected]: (state) => {
      state.comments.commentsList = [];
      state.comments.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
