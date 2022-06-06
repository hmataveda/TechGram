import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllposts,
  singlePost,
  deletePost,
  createPost,
  updatePost,
} from "../services/postServices";

const initialState = {
  posts: [],
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    searchPost: (state, action) => {
      state.posts = state.posts.filter((post) => post.title == action.payload);
    },
  },
  extraReducers: {
    [getAllposts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllposts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getAllposts.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("error", action.payload);
    },

    [updatePost.fulfilled]: (state, action) => {
      console.log(" Post Updated successfully", action.payload);
      // we can change the state if necessary
    },

    [createPost.fulfilled]: (state, action) => {
      console.log("single Post Created successfully", action.payload);
      //   state.posts.push(action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      console.log("Deleted Post  successfully", action.payload);
      //   const deletedState = state.posts.filter(
      //     (post) => post._id != action.payload._id
      //   );
      //   state.posts = deletedState;
    },
  },
});

export const selectAllposts = (state) => state.posts.posts;
export default postsSlice.reducer;

export const { searchPost } = postsSlice.actions;
