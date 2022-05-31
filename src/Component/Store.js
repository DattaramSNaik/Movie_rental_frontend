import { configureStore } from "@reduxjs/toolkit";
import genreReducer from "../Resources/reducer/genreSlice";
import customerReducer from "../Resources/reducer/customerSlice";
import registerReducer from "../Resources/reducer/RegisterSlice";
import loginReducer from "../Resources/reducer/loginSlice";
import MovieReducer from "../Resources/reducer/moviesSlice";
import rentalReducer from "../Resources/reducer/rentalsSlice";

export const store = configureStore({
  reducer: {
    genreReducer,
    customerReducer,
    registerReducer,
    loginReducer,
    MovieReducer,
    rentalReducer,
  },
  devTools: true,
});
