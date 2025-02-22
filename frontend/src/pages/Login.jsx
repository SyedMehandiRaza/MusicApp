import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";

function Login() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sign-in",
        values,
        { withCredentials: true }
      );
      dispatch(authActions.login());
      // console.log(response.data);

      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>{isLoggedIn ? <ErrorPage /> : <div className="h-screen bg-green-100 flex justify-center items-center ">
      <div className="w-4/6 md:w-3/6 lg:w-2/6  flex flex-col items-center justify-center">
        <Link className="text-2xl font-bold" to="/">
          PODCATER
        </Link>
        <div className="mt-6 w-full">
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
              className="mt
              -2 px-2 py-2 rounded outline-none border border-black"
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <button
              className="bg-green-900 text-white text-xl rounded py-2 font-semibold"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold hover:text-blue-600">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>}</>
    
  );
}

export default Login;
