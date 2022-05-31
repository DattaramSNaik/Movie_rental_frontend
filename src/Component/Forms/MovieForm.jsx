import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
import { retrieveGenres } from "../../Resources/reducer/genreSlice";
import { createMovie, updateMovie } from "../../Resources/reducer/moviesSlice";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const schema = yup.object().shape({
  title: yup.string().min(5).max(50).required(),
  genreId: yup.string().required(),
  numberInStock: yup.number().min(0).max(255).required(),
  dailyRentalRate: yup.number().min(0).max(255).required(),
  liked: yup.boolean(),
});
const MovieForm = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const genres = useSelector((state) => state.genreReducer.genres);
  const movies = useSelector((state) => state.MovieReducer.movies);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const params = useParams();

  useEffect(() => {
    dispatch(retrieveGenres());
    const movieId = params.movieId;
    if (!movieId) return;
    const movie = movies.find((m) => m._id === params.movieId);
    if (!movie) return;
    setValue("_id", movie._id);
    setValue("title", movie.title);
    setValue("numberInStock", movie.numberInStock);
    setValue("dailyRentalRate", movie.dailyRentalRate);
    setValue("liked", movie.liked);
    setValue("genreId", movie.genre._id);
  }, []);
  const onSubmitHandler = (data) => {
    console.log({ data });
    if (!data._id) {
      dispatch(createMovie(data));
    } else {
      dispatch(updateMovie(data));
    }
    navigator("/movies");
  };
  return (
    <div data-aos="flip-up">
      {params.movieId ? (
        <h1 className="font-bold text-xl font-serif my-2">Edit Movie</h1>
      ) : (
        <h1 className="font-bold text-xl font-serif">Add Movie</h1>
      )}
      <div className=" flex items-center justify-center">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Title"
                {...register("title")}
              />
              <p className="text-red-900">{errors.title?.message}</p>
            </div>

            <div className="form-group mb-6 border py-2">
              <label for="genre"> Genre: </label>
              <select
                className="dropdown-content"
                {...register("genreId")}
                id="genre"
              >
                {genres.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-900">{errors.genre?.message}</p>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput91"
                placeholder="Daily Rental Rate"
                {...register("dailyRentalRate")}
              />
              <p className="text-red-900">{errors.dailyRentalRate?.message}</p>
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput91"
                placeholder="Number In Stock"
                {...register("numberInStock")}
              />
              <p className="text-red-900">{errors.numberInStock?.message}</p>
            </div>
            <div className="flex justify-center">
              <div className="form-check">
                <label
                  for="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className=" rounded border-gray-300 text-indigo-600 
                    shadow-sm focus:border-indigo-300 focus:ring
                     focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register("liked")}
                  />
                  <span className="ml-2 text-base text-gray-600 font-bold font-serif">
                    Like
                  </span>
                </label>
                <p className="text-red-900">{errors.Like?.message}</p>
              </div>
            </div>
            <br />
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

export default MovieForm;
