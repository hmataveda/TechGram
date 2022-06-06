import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllposts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    const resp = await axios.get("http://localhost:8000/api/posts", {
      withCredentials: true,
    });
    return resp.data;
  } catch (err) {
    console.log("error while getting all posts", err);
    return err;
  }
});

const createPost = createAsyncThunk("post/createPost", async (post) => {
  try {
    const resp = await axios.post(`http://localhost:8000/api/posts`, post, {
      withCredentials: true,
    });
    return resp.data;
  } catch (err) {
    console.log("Error while creating the post", err);
    return err;
  }
});
const updatePost = createAsyncThunk("post/updatePost", async ({ post, id }) => {
  try {
    console.log(post);
    console.log(id);
    const resp = await axios.put(`http://localhost:8000/api/post/${id}`, post, {
      withCredentials: true,
    });
    return resp.data;
  } catch (err) {
    console.log("Error while updating the post", err);
    return err;
  }
});
const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const resp = await axios.delete(`http://localhost:8000/api/post/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (err) {
    console.log("Error while deleting the post", err);
    return err;
  }
});

export { getAllposts, createPost, updatePost, deletePost };
