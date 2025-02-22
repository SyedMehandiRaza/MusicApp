import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import ErrorPage from "./ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
function Signup() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", values);
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };


  return (
    <>{isLoggedIn ? (<ErrorPage />) : (<div className="h-screen bg-green-100 flex justify-center items-center ">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        draggable
/>
      <div className="w-4/6 md:w-3/6 lg:w-2/6  flex flex-col items-center justify-center">
        <Link className="text-2xl font-bold" to="/">
          PODCATER
        </Link>
        <div className="mt-6 w-full">
          <div className="w-full flex flex-col">
            <label htmlFor="" className="">
              Username
            </label>
            <input
              name="username"
              value={values.username}
              onChange={change}
              placeholder="Username"
              required
              type="text"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
            />
          </div>
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="">Email</label>
            <input
              name="email"
              value={values.email}
              onChange={change}
              placeholder="email"
              required
              type="email"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
            />
          </div>
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="" className="">
              Password
            </label>
            <input
              name="password"
              value={values.password}
              onChange={change}
              placeholder="password"
              required
              type="password"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <button className="bg-green-900 text-white text-xl rounded py-2 font-semibold" onClick={handleSubmit}>
              Signup
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>)}</>
    
  );
}

export default Signup;
