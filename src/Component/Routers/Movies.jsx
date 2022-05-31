import React, { useState, useEffect } from "react";

import Pagination from "../Pagination/Pagination";
import FilterList from "../Pagination/FilterList";
import SearchBox from "../Pagination/SearchBox";
import MovieTable from "./MovieTable";

import {
  pagiation,
  countMovies,
  deleteMovie,
} from "../../Resources/reducer/moviesSlice";
import { retrieveGenres } from "../../Resources/reducer/genreSlice";
import { useSelector, useDispatch } from "react-redux";

const Movies = () => {
  const movies = useSelector((state) => state.MovieReducer.movies);
  const error = useSelector((state) => state.MovieReducer.error);
  const count = useSelector((state) => state.MovieReducer.count);
  const genre = useSelector((state) => state.genreReducer.genres);
  const pageSize = 3;
  const dispatch = useDispatch();
  const [currentPage, setCurrentapage] = useState(1);
  const [genreName, setGenreName] = useState("");
  const [title, setTitle] = useState("");
  const [sort_by, setSort_by] = useState({ field: "title", order_by: 1 });
  useEffect(() => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    dispatch(countMovies({ gName, title }));
  }, [movies]);
  //Normal Dispatch
  useEffect(() => {
    dispatch(retrieveGenres());
    dispatch(
      pagiation({
        currentPage: currentPage,
        pageSize: pageSize,
        genreName: genreName,
        title: title,
        sort_by: sort_by,
      })
    );
  }, []);
  //Genre Change
  const handleGenreChange = (genreName) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setCurrentapage(1);
    setTitle(title);
    setGenreName(genreName);
    dispatch(
      pagiation({
        currentPage: 1,
        pageSize: pageSize,
        genreName: gName,
        title: title,
        sort_by,
      })
    );
  };

  //On search event
  const handleSearch = (title) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setTitle(title);
    setCurrentapage(1);
    dispatch(
      pagiation({
        currentPage: 1,
        genreName: gName,
        pageSize: pageSize,
        title: title,
        sort_by,
      })
    );
  };
  //on Sort Method...
  const handleSort = (sort_by) => {
    console.log("Sorting Started", sort_by);
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setSort_by(sort_by);
    dispatch(
      pagiation({
        currentPage,
        pageSize: pageSize,
        genreName: gName,
        title,
        sort_by,
      })
    );
  };

  // On Pagination change
  const handleChange = (page) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setCurrentapage(page);
    setTitle(title);
    dispatch(
      pagiation({
        currentPage: page,
        pageSize: pageSize,
        genreName: gName,
        title: title,
        sort_by,
      })
    );
  };

  const handleDelete = (id) => {
    setCurrentapage(1);
    dispatch(deleteMovie(id));
  };
  return (
    <div className="Movies">
      <h1 className="font-bold text-xl font-serif my-2 link">Movies Details</h1>

      <div>
        {/* Search box */}
        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="flex space-x-5">
        {/* Filter box */}
        <FilterList
          items={[{ _id: "", name: "All Genres" }, ...genre]}
          selectedGenreName={genreName}
          onGenreSelect={handleGenreChange}
        />
        <div className="w-full shadow-xl relative overflow-x-auto shadow-md ">
          {/* Movie Table */}
          {error && <h4 style={{ color: "red" }}>Something Failed</h4>}
          {movies && movies.length > 0 ? (
            <MovieTable
              movies={movies}
              onSort={handleSort}
              sort_by={sort_by}
              onDelete={handleDelete}
            />
          ) : (
            <h1 className="text-red-900 font-bold">
              No Movies Found In that page ...
            </h1>
          )}

          <div>
            {/* Pagination Table */}
            <Pagination
              count={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
