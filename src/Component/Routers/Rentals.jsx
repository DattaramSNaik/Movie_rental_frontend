import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRentals,
  rentalPatch,
  paginationSearch,
  count,
} from "../../Resources/reducer/rentalsSlice";
import Pagination from "../Pagination/Pagination";
const Rentals = () => {
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  const rentalCount = useSelector((state) => state.rentalReducer.count);
  const [currentPage, setCurrentapage] = useState(1);
  const pageSize = 5;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(count());
  }, [rentals]);
  useEffect(() => {
    dispatch(
      paginationSearch({ currentPage: currentPage, pageSize: pageSize })
    );
  }, []);
  const handleChange = (page) => {
    setCurrentapage(page);
    dispatch(paginationSearch({ currentPage: page, pageSize: pageSize }));
  };
  return (
    <div className="Rentals">
      <h1 className="font-bold text-xl font-serif link">Rentals Details</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-1/2  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Movie Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date-IN
              </th>
              <th scope="col" className="px-6 py-3">
                Date-out
              </th>
              <th scope="col" className="px-6 py-3">
                RentalFees
              </th>
              <th scope="col" className="px-10 py-3">
                Delete
              </th>
              <th scope="col" className="px-2 py-1">
                update
              </th>
            </tr>
          </thead>
          <tbody>
            {rentals && rentals.length === 0 ? (
              <tr>
                <td colSpan="2">
                  <p className="text-center text-red-900 font-bold ">
                    Rented Customer or Movie Not Found.
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {rentals.map((r) => (
                  <tr
                    key={r._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {r.customer.name}
                    </th>
                    <td className="px-6 py-4">{r.movie.title}</td>
                    <td className="px-6 py-4">{r.dateIn}</td>
                    <td className="px-6 py-4">{r.dateOut}</td>
                    <td className="px-6 py-4">{r.rentalFee}</td>
                    <td className="px-6 py-4">
                      <div className="flex content-center">
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => dispatch(deleteRentals(r._id))}
                          disabled={r.dateIn === null ? true : false}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td>
                      <ion-icon
                        className="my-2"
                        name="build"
                        disabled={r.dateIn === null ? true : false}
                        onClick={() =>
                          dispatch(
                            rentalPatch({
                              _id: r._id,
                              dateIn: new Date().getTime(),
                            })
                          )
                        }
                        style={{ color: "grey", fontSize: "22px" }}
                      ></ion-icon>
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
                  className="w-1/4
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
                  <Link to="/rentals/new"> Insert </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination
          count={rentalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Rentals;
