import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rentalService from "../../DBServices/rentalService";
const initialState = {
  rentals: [],
  count: 0,
};
export const createRetals = createAsyncThunk(
  "rentals/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.create(data, token);
    return res.data;
  }
);
export const retrieveRentals = createAsyncThunk(
  "rentals/retrieve",
  async () => {
    const res = await rentalService.getAll();
    return res.data;
  }
);
export const count = createAsyncThunk("rentals/count", async () => {
  const res = await rentalService.count();
  return res.data;
});
export const paginationSearch = createAsyncThunk(
  "rentals/paginationSearch",
  async (data) => {
    const res = await rentalService.paginationSearch(data);
    return res.data;
  }
);
export const rentalPatch = createAsyncThunk(
  "rentals/update",
  async ({ _id, ...data }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.patch(_id, data, token);
    return res.data;
  }
);
export const deleteRentals = createAsyncThunk(
  "rentals/delete",
  async (_id, thunkAPI) => {
    console.log("getting id for Update  " + _id);
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.remove(_id, token);
    if (res.data) {
      const response = await rentalService.paginationSearch({
        currentPage: 1,
        pageSize: 5,
      });

      return response.data;
    }
  }
);

export const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  extraReducers: {
    [createRetals.fulfilled]: (state, action) => {
      state.rentals.push(action.payload);
    },
    [retrieveRentals.fulfilled]: (state, action) => {
      return { rentals: [...action.payload] };
    },
    [paginationSearch.fulfilled]: (state, action) => {
      state.rentals = [...action.payload];
    },
    [count.fulfilled]: (state, action) => {
      state.count = action.payload.rentalCount;
    },
    [rentalPatch.fulfilled]: (state, action) => {
      const index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      state.rentals.splice(index, 1, action.payload);
    },
    [deleteRentals.fulfilled]: (state, action) => {
      state.rentals = action.payload;
    },
  },
});

export const { reducer } = rentalSlice;
export default reducer;
