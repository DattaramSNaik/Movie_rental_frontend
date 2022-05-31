import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../Pagination/SearchBox";
import {
  deleteGenre,
  retrieveGenres,
  countGenres,
  paginationSearch,
} from "../../Resources/reducer/genreSlice";
import { Link } from "react-router-dom";
const Genre = () => {
  const genres = useSelector((state) => state.genreReducer.genres);
  const token = useSelector((state) => state.loginReducer.token);
  const genreCount = useSelector((state) => state.genreReducer.count);

  const pageSize = 3;
  const [currentPage, setCurrentapage] = useState(1);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    dispatch(countGenres(name));
  }, [genres]);
  useEffect(() => {
    dispatch(
      paginationSearch({
        currentPage: currentPage,
        pageSize: pageSize,
        name: name,
      })
    );
  }, []);
  let handleChange = (page) => {
    setCurrentapage(page);
    setName(name);
    dispatch(
      paginationSearch({ currentPage: page, pageSize: pageSize, name: name })
    );
  };
  let handleSearch = (gname) => {
    setName(gname);
    setCurrentapage(1);
    dispatch(
      paginationSearch({ currentPage: 1, pageSize: pageSize, name: gname })
    );
  };

  return (
    <div className="genre" data-aos="flip-up">
      <h1 className="font-bold text-xl font-serif link">Genre Details</h1>

      <SearchBox onSearch={handleSearch} />
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" shadow-xl w-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                Genre Name
              </th>
              <th scope="col" className=" px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {genres && genres.length === 0 ? (
              <tr>
                <td colSpan="2">
                  <p className="text-center text-red-900 font-bold ">
                    Genres Not Found.
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {genres.map((g) => (
                  <tr
                    key={g._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className=" text-center px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <Link to={`/genre/${g._id}`}> {g.name} </Link>
                    </th>
                    <td className="px-2 py-4">
                      <button
                        type="button"
                        className=" text-center text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => dispatch(deleteGenre(g._id))}
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
                colSpan="2"
                scope="row"
                className="text-center  mx-5 px-6 py-5 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                <button
                  type="button"
                  className="w-full
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
                  <Link to="/genre/new"> Insert </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Pagination
            count={genreCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Genre;
