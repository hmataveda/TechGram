import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Slices/postSlice";
import userReducer from "./Slices/userSlice";

console.log("userReducer", userReducer);
const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export default store;
