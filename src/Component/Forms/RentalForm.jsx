import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { createRetals } from "../../Resources/reducer/rentalsSlice";
import { retrieveMovies } from "../../Resources/reducer/moviesSlice";
import { retrieveCustomer } from "../../Resources/reducer/customerSlice";
const schema = yup.object().shape({
  customerId: yup.string().required(),
  movieId: yup.string().required(),
});
const RentalForm = () => {
  const customer = useSelector((state) => state.customerReducer.customer);
  const movies = useSelector((state) => state.MovieReducer.movies);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(retrieveMovies());
    dispatch(retrieveCustomer());
  }, []);
  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(createRetals(data));
    navigator("/rentals");
  };

  return (
    <div data-aos="flip-up">
      <h1 className="font-bold text-xl font-serif m-5">Rentals Form</h1>
      <div className=" flex items-center justify-center m-2">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-group mb-6 border py-2 px-3">
              <label> Movie: </label>
              <select
                className=" w-1/2 dropdown-content"
                {...register("movieId")}
                id="genre"
              >
                {movies.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
            <p>{errors.movieId?.message}</p>
            <div className="form-group mb-6 border py-2 px-3">
              <label> Customer: </label>
              <select
                className="dropdown-content"
                {...register("customerId")}
                id="genre"
              >
                {customer.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <p>{errors.customerId?.message}</p>
            <button
              type="submit"
              className="
      w-full
      px-6
      py-2.5
      bg-red-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-red-700 hover:shadow-lg
      focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
