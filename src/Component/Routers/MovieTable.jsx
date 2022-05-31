import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../Resources/reducer/moviesSlice";
import TableHeader from "../TableHeader";
const MovieTable = ({ movies, onSort, sort_by, onDelete }) => {
  const dispatch = useDispatch();
  const columns = [
    {
      path: "title",
      header: "Title",
    },
    {
      path: "genre.name",
      header: "Genre",
    },
    {
      path: "numberInStock",
      header: "Stock ",
    },
    {
      path: "dailyRentalRate",
      header: "Rate ",
    },
    { key: "like", header: "like" },
    { key: "delete", header: "delete" },
  ];
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader columns={columns} onSort={onSort} sort_by={sort_by} />
        <tbody>
          {movies && movies.length === 0 ? (
            <tr>
              <td colSpan="6">
                <p className="text-center text-red-900 font-bold ">
                  Movie Not Found with Given Genre.
                </p>
              </td>
            </tr>
          ) : (
            <>
              {movies.map((m) => (
                <tr
                  key={m._id}
                  className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <td className="px-6 py-4">
                    <Link to={`/movies/${m._id}`}> {m.title} </Link>
                  </td>
                  <td className="px-6 py-4">{m.genre.name}</td>
                  <td className="px-6 py-4">{m.numberInStock}</td>
                  <td className="px-6 py-4">{m.dailyRentalRate}</td>
                  <td className="px-6 py-4">
                    {m.liked == true ? (
                      <ion-icon
                        style={{ color: "red", fontSize: "22px" }}
                        name="heart"
                      ></ion-icon>
                    ) : (
                      <ion-icon
                        style={{ color: "red", fontSize: "22px" }}
                        name="heart-empty"
                      ></ion-icon>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => onDelete(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}

          <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td
              colSpan="6"
              scope="row"
              className="text-center  mx-5 px-6 py-5 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              <button
                type="button"
                className="w-1/6
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
                <Link to="/movies/new"> Insert </Link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
