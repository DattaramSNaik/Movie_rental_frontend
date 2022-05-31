import React from "react";

const FilterList = ({ items, selectedGenreName, onGenreSelect }) => {
  return (
    <div className="flex justify-center my-6">
      <ul className="bg-white  border border-gray-200 w-60 text-gray-900">
        {items.map((genre) => (
          <li
            style={{ cursor: "pointer" }}
            key={genre._id}
            className={
              genre.name === selectedGenreName
                ? "w-full px-4 py-2 font-medium text-left text-white bg-red-900 border-b border-gray-200  cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600"
                : "w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            }
          >
            <span onClick={() => onGenreSelect(genre.name)}>{genre.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
//px-6 py-2 border-b border-gray-200 w-full hover:bg-red-800 hover:text-white

//w-full px-4 py-2 font-medium text-left text-white bg-blue-700 border-b border-gray-200  cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600
