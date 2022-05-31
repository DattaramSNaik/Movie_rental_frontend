import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  createCustomer,
  updateCustomer,
} from "../../Resources/reducer/customerSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  name: yup.string().min(5).max(15).required(),
  phone: yup.string().min(7).max(10).required(),
  isGold: yup.boolean(),
});

const CustomerForm = () => {
  const customers = useSelector((state) => state.customerReducer.customer);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();
  useEffect(() => {
    const customerId = params.customerId;
    if (!customerId) return;
    const customer = customers.find((c) => c._id === params.customerId);
    if (!customer) return;
    setValue("name", customer.name);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
    setValue("_id", customer._id);
  }, []);
  const onSubmitHandler = (data) => {
    console.log(data);
    if (!data._id) {
      dispatch(
        createCustomer({
          _id: nanoid(),
          name: data.name,
          phone: data.phone,
          isGold: data.isGold,
        })
      );
    } else {
      dispatch(updateCustomer(data));
    }
    navigator("/customers");
    reset();
  };
  return (
    <div data-aos="fade-out">
      {params.customerId ? (
        <h1 className="font-bold text-xl font-serif mt-1">Edit Customer</h1>
      ) : (
        <h1 className="font-bold text-xl font-serif mt-1">Add Customer</h1>
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
                placeholder="Customer Name"
                {...register("name")}
              />
              <p className="text-red-900">{errors.name?.message}</p>
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
                id="exampleInput90"
                placeholder="Mobile Number"
                {...register("phone")}
              />
              <p className="text-red-900">{errors.phone?.message}</p>
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
                    className=" rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    {...register("isGold")}
                  />
                  <span className="ml-2 text-base text-gray-600 font-bold font-serif">
                    IsGold
                  </span>
                </label>
                <p className="text-red-900">{errors.isGold?.message}</p>
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

export default CustomerForm;
