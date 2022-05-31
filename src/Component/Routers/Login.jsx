import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../../Resources/reducer/loginSlice";

import { useNavigate } from "react-router";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(10)
    .required()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});
const Login = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const error = useSelector((state) => state.loginReducer.error);

  const navigator = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      navigator("/movies");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    dispatch(signInUser(data));
  };
  return (
    <div>
      <div className="font-sans" data-aos="zoom-in-down">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center m-5 ">
          <div className="relative sm:max-w-sm w-full" data-aos="flip-left">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-500 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <label className="block mt-3 text-xl text-gray-700 text-center font-bold font-serif">
                Login
              </label>
              <form
                className="mt-10"
                onSubmit={handleSubmit(onSubmitHandler)}
                autocomplete="off"
              >
                <div>
                  <input
                    type="email"
                    placeholder="Enter Email Address..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("email")}
                  />
                  <p className="text-red-900">{errors.email?.message}</p>
                </div>

                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="Enter Password..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("password")}
                  />
                  <p className="text-red-900">{errors.password?.message}</p>
                </div>

                <div className="mt-7 flex">
                  <label className="inline-flex items-center w-full cursor-pointer">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className=" rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="remember"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>

                  <div className="w-full text-right">
                    <a
                      className="underline text-sm text-gray-600 hover:text-gray-900"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div>
                  {error === "" ? (
                    ""
                  ) : (
                    <h1 className="font-bold text-red-500">{error}</h1>
                  )}
                </div>
                <div className="mt-7">
                  <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                  </button>
                </div>

                <div className="flex mt-7 items-center text-center">
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                  <label className="block font-medium text-sm text-gray-600 w-full">
                    Movie Rental
                  </label>
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2">New User ?</label>
                    <a
                      href="#"
                      className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      <Link to="/register">Create New Account</Link>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
