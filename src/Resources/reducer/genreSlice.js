import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import genreService from "../../DBServices/genresServices";
const initialState = {
  genres: [],
  count: 0,
};
export const createGenre = createAsyncThunk(
  "genres/create",
  async ({ name }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await genreService.create({ name }, token);
    return res.data;
  }
);
export const retrieveGenres = createAsyncThunk("genres/retrieve", async () => {
  const res = await genreService.getAll();
  return res.data;
});
export const countGenres = createAsyncThunk("genres/count", async (name) => {
  const res = await genreService.count(name);
  return res.data;
});
export const paginationSearch = createAsyncThunk(
  "genres/paginationSearch",
  async (data) => {
    const res = await genreService.paginationSearch(data);
    return res.data;
  }
);
export const updateGenre = createAsyncThunk(
  "genres/update",
  async ({ _id, name }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await genreService.update(_id, { name }, token);
    return res.data;
  }
);
export const deleteGenre = createAsyncThunk(
  "genres/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await genreService.remove(id, token);
    if (res.data) {
      const response = await genreService.paginationSearch({
        currentPage: 1,
        pageSize: 3,
      });
      return response.data;
    }
  }
);

export const genreSlice = createSlice({
  name: "genres",
  initialState,
  extraReducers: {
    [createGenre.fulfilled]: (state, action) => {
      state.genres.push(action.payload);
    },
    [retrieveGenres.fulfilled]: (state, action) => {
      state.genres = [...action.payload];
    },
    [countGenres.fulfilled]: (state, action) => {
      state.count = action.payload.genresCount;
    },
    [paginationSearch.fulfilled]: (state, action) => {
      state.genres = [...action.payload];
    },
    [updateGenre.fulfilled]: (state, action) => {
      const index = state.genres.findIndex(
        (genre) => genre._id === action.payload._id
      );
      state.genres.splice(index, 1, action.payload);
    },
    [deleteGenre.fulfilled]: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { reducer } = genreSlice;
export default reducer;
