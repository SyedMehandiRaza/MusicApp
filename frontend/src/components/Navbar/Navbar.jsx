import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  
  const [MobileNav, setMobileNav] = useState(false);
  const [menu, setMenu] = useState(true);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "All Podcasts",
      path: "/all-podcasts",
    },
    
  ];
  return (
    <nav className="lg:px-12 px-4 md:px-8 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="logo brand-name w-2/6 flex items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="podcaster"
            className="h-12"
          />
          <Link to="/" className="text-2xl font-bold">
            Podcaster
          </Link>
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="px-4 py-2 hover:text-blue-500 hover:font-bold transition-all duration-300 z-10"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden w-2/6 lg:flex items-center justify-end z-20">
          {!isLoggedIn && <><Link to="/login" className="px-6 py-4 border border-black rounded-full cursor-pointer">
            Login
          </Link>
          <Link to="/signup" className="ml-4 px-6 py-4  bg-black text-white rounded-full cursor-pointer">
            Signup
          </Link></>}
          {isLoggedIn && <Link to="/profile" className="px-6 py-4 border border-black rounded-full cursor-pointer">
            Profile
            </Link>}
        </div>
        <div className="lg:hidden flex items-center justify-end w-4/6 z-50">
          <button
            className={` ${menu ? "text-5xl" : "hidden z-50"}`}
            onClick={() => {
              setMobileNav(!MobileNav);
              setMenu(!menu);
            }}
          >
            <IoReorderThreeOutline />
          </button>
        </div>
      </div>
      <div
        className={`fixed w-full h-screen top-0 left-0 bg-blue-100 ${
          MobileNav ? "translate-y-0" : "-translate-y-full"
        } transform transition-transform duration-300`}
      >
        <div className="flex items-center justify-end p-8 text-5xl">
          <button
            onClick={() => {
              setMobileNav(!MobileNav), setMenu(!menu);
            }}
            className=""
          >
            <RxCrossCircled />
          </button>
        </div>
        <div className="h-full -mt-10 flex flex-col items-center justify-center text-3xl">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="mb-10 hover:font-semibold hover:text-blue-500 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="mb-10 hover:font-semibold hover:text-blue-500 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="mb-10 hover:font-semibold hover:text-blue-500 transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
