import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersService from "../../DBServices/customersServices";
const initialState = {
  customer: [],
  count: 0,
};

export const createCustomer = createAsyncThunk(
  "customer/create",
  async ({ name, phone, isGold }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await customersService.create({ name, phone, isGold }, token);
    return res.data;
  }
);

export const retrieveCustomer = createAsyncThunk(
  "customer/retrieve",
  async () => {
    const res = await customersService.getAll();
    return res.data;
  }
);
export const count = createAsyncThunk("customer/count", async (name) => {
  const res = await customersService.count(name);
  return res.data;
});
export const paginationSearch = createAsyncThunk(
  "customer/paginationSearch",
  async (data) => {
    const res = await customersService.paginationSearch(data);
    return res.data;
  }
);
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ _id, name, phone, isGold }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await customersService.update(
      _id,
      { name, phone, isGold },
      token
    );
    return res.data;
  }
);
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await customersService.remove(id, token);
    if (res.data) {
      const response = await customersService.paginationSearch({
        currentPage: 1,
        pageSize: 3,
      });
      return response.data;
    }
    //return res.data;
  }
);

export const customerSlice = createSlice({
  name: "Customer",
  initialState,
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.customer.push(action.payload);
    },
    [retrieveCustomer.fulfilled]: (state, action) => {
      return { customer: [...action.payload] };
    },
    [paginationSearch.fulfilled]: (state, action) => {
      state.customer = [...action.payload];
    },
    [count.fulfilled]: (state, action) => {
      state.count = action.payload.customerCount;
    },
    [updateCustomer.fulfilled]: (state, action) => {
      const index = state.customer.findIndex(
        (customer) => customer._id === action.payload.id
      );
      state.customer.splice(index, 1, action.payload);
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { reducer } = customerSlice;
export default reducer;
