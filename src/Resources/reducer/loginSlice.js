import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../DBServices/loginService";

const initialState = {
  token: "",
  error: "",
};
export const signInUser = createAsyncThunk("login/create", async (data) => {
  const res = await loginService.create(data);
  sessionStorage.setItem("token", res.data);
  return res.data;
});

export const loginUser = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loadLogin: (state) => {
      state.token = sessionStorage.getItem("token");
      console.log("LOAD Login " + state.token);
    },
    loadLogout: (state) => {
      state.token = "";
      sessionStorage.setItem("token", "");
    },
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      console.log(state.token);
    },
    [signInUser.rejected]: (state, action) => {
      state.error = action.error.code;
    },
  },
});
export const { loadLogin, loadLogout } = loginUser.actions;
export const { reducer } = loginUser;
export default reducer;
