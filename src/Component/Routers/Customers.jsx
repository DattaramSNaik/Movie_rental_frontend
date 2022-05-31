import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../Pagination/SearchBox";
import {
  retrieveCustomer,
  deleteCustomer,
  count,
  paginationSearch,
} from "../../Resources/reducer/customerSlice";

const Customers = () => {
  const customer = useSelector((state) => state.customerReducer.customer);
  const customerCount = useSelector((state) => state.customerReducer.count);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const pageSize = 3;

  useEffect(() => {
    dispatch(count(name));
  }, [customer]);
  useEffect(() => {
    dispatch(
      paginationSearch({ currentPage: currentPage, pageSize, name: name })
    );
  }, []);
  const handleSearch = (cname) => {
    setCurrentPage(1);
    setName(cname);
    dispatch(paginationSearch({ currentPage: 1, pageSize, name: cname }));
  };
  const handleChange = (page) => {
    setName(name);
    setCurrentPage(page);
    dispatch(paginationSearch({ currentPage: page, pageSize, name: name }));
  };
  return (
    <div className="customer" data-aos="flip-up">
      <h1 className="font-bold text-xl font-serif link">Customers Details</h1>
      <SearchBox onSearch={handleSearch} />
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" shadow-xl w-1/4 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                phone
              </th>
              <th scope="col" className="px-6 py-3">
                Gold
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {customer && customer.length === 0 ? (
              <tr>
                <td colSpan="2">
                  <p className="text-center text-red-900 font-bold ">
                    Customer Not Found.
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {customer.map((C) => (
                  <tr
                    key={C._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <Link to={`/customers/${C._id}`}> {C.name} </Link>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {C.phone}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {C.isGold === true ? (
                        <ion-icon
                          style={{ color: "red", fontSize: "22px" }}
                          name="star"
                        ></ion-icon>
                      ) : (
                        <ion-icon
                          style={{ color: "red", fontSize: "22px" }}
                          name="star-outline"
                        ></ion-icon>
                      )}
                    </th>
                    <td className="px-2 py-4">
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => dispatch(deleteCustomer(C._id))}
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
                colSpan="4"
                scope="row"
                className="  text-center mx-5 px-6 py-5 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                <button
                  type="button"
                  className="w-1/2
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
                  <Link to="/customers/new"> Insert </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination
          count={customerCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Customers;
