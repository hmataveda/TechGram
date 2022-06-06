import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../services/userServices";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const userToken = Cookies.get("userToken");
console.log("USER TOKEN", userToken);
if (userToken) {
  var user = jwtDecode(userToken);
}

let isLoggedIn = false;
if (userToken) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}
const initialState = {
  isLoggedIn: isLoggedIn,
  authToken: userToken,
  user: user || {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("logged user", action.payload);
      state.user = action.payload.loggedInuser;
      state.isLoggedIn = true;
      const userToken = Cookies.get("userToken");
      state.authToken = userToken;
    },
    [register.fulfilled]: (state, action) => {
      console.log("registerd user", action.payload);
      state.user = action.payload.RegisterdUser;
      state.isLoggedIn = true;
      const userToken = Cookies.get("userToken");
      state.authToken = userToken;
    },
    [logout.fulfilled]: (state, action) => {
      console.log("user logged out", action.payload);
      state.user = {};
      state.isLoggedIn = false;
      state.authToken = "";
    },
  },
});

console.log("userReducer", userSlice);

export default userSlice.reducer;
