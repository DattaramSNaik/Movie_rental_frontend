import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createGenre, updateGenre } from "../../Resources/reducer/genreSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  name: yup.string().min(3).max(10).required(),
});

const GenreForm = () => {
  const genres = useSelector((state) => state.genreReducer.genres);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();

  useEffect(() => {
    const genreId = params.genreId;
    if (!genreId) return;
    const genre = genres.find((g) => g._id === params.genreId);
    if (!genre) return;
    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, []);

  const onSubmitHandler = (data) => {
    if (!data._id) {
      dispatch(
        createGenre({
          _id: nanoid(),
          name: data.name,
        })
      );
      setValue("");
    } else {
      dispatch(updateGenre(data));
      setValue("");
    }
    navigator("/genre");

    reset();
  };

  return (
    <div data-aos="flip-up">
      {params.genreId ? (
        <h1 className="font-bold text-xl font-serif">Edit Genre</h1>
      ) : (
        <h1 className="font-bold text-xl font-serif">Add Genre</h1>
      )}
      <div className="flex items-center justify-center my-3">
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
                placeholder="Genre Name"
                {...register("name")}
              />
              <p className="text-red-900">{errors.name?.message}</p>
            </div>

            <button
              type="submit"
              className="
      w-full
      px-6
      py-2.5
      bg-red-700
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

export default GenreForm;
