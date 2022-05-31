import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import movieServies from "../../DBServices/movieServices";
const initialState = {
  movies: [],
  count: 0,
  error: "",
};
export const createMovie = createAsyncThunk(
  "Movies/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieServies.create(data, token);
    return res.data;
  }
);

export const pagiation = createAsyncThunk("Movies/Pagination", async (data) => {
  const res = await movieServies.pfs(data);
  return res.data;
});

export const retrieveMovies = createAsyncThunk("Movies/retrieve", async () => {
  const res = await movieServies.getAll();
  return res.data;
});
export const countMovies = createAsyncThunk("Movies/count", async (data) => {
  const res = await movieServies.count(data.gName, data.title);
  return res.data;
});

export const updateMovie = createAsyncThunk(
  "Movies/update",
  async ({ _id, ...data }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieServies.update(_id, { ...data }, token);
    return res.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "Movies/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieServies.remove(id, token);
    if (res.data) {
      const response = await movieServies.pfs({
        currentPage: 1,
        pageSize: 3,
        genreName: "",
        title: "",
        sort_by: { field: "title", order_by: 1 },
      });
      return response.data;
    } else {
      console.log("here", res.data);
    }
  }
);

const MovieSlice = createSlice({
  name: "Movies",
  initialState,
  extraReducers: {
    [createMovie.fulfilled]: (state, action) => {
      state.movies.push(action.payload);
    },
    [createMovie.rejected]: (state, action) => {
      state.error = "Something Failed";
    },

    [pagiation.fulfilled]: (state, action) => {
      state.movies = [...action.payload];
    },
    [pagiation.rejected]: (state, action) => {
      state.error = "Something Failed";
    },
    [retrieveMovies.fulfilled]: (state, action) => {
      return { movies: [...action.payload] };
    },
    [countMovies.fulfilled]: (state, action) => {
      state.count = action.payload.moviesCount;
    },
    [updateMovie.fulfilled]: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie._id === action.payload._id
      );
      state.movies.splice(index, 1, action.payload);
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.movies = action.payload;
    },
    [deleteMovie.rejected]: (state, action) => {
      state.error = "Something Failed";
    },
  },
});

export const { reducer } = MovieSlice;
export default reducer;
