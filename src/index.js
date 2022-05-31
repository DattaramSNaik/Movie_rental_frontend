import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Component/Routers/Login";
import Register from "./Component/Routers/Register";
import Customers from "./Component/Routers/Customers";
import CustomerForm from "./Component/Forms/CustomerForm";
import Rentals from "./Component/Routers/Rentals";
import RentalForm from "./Component/Forms/RentalForm";
import Movies from "./Component/Routers/Movies";
import Genre from "./Component/Routers/Genre";
import { Provider } from "react-redux";
import GenreForm from "./Component/Forms/GenreForm";
import MovieForm from "./Component/Forms/MovieForm";
import Error from "./Component/Routers/Error";

import { store } from "./Component/Store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieForm />} />
          <Route path="movies/new" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="customers/:customerId" element={<CustomerForm />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="rentals/new" element={<RentalForm />} />
          <Route path="genre" element={<Genre />}></Route>
          <Route path="genre/:genreId" element={<GenreForm />} />
          <Route path="genre/new" element={<GenreForm />} />
          <Route path="error" element={<Error />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <h1>There's nothing here!</h1>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
