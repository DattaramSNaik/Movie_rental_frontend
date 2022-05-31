import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../../DBServices/registerService";
const initialState = {
  register: false,
  error: "",
};
export const createUser = createAsyncThunk(
  "register/create",
  async ({ password, email, isAdmin, name }) => {
    const res = await registerService.create({
      password,
      email,
      isAdmin,
      name,
    });
    return res.data;
  }
);

export const RegisterSlice = createSlice({
  name: "Register",
  initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.register = true;
      }
    },
    [createUser.pending]: (state, action) => {
      state.error = "Success Go to Login...!!!";
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.error.code;
    },
  },
});

export const { reducer } = RegisterSlice;
export default reducer;
