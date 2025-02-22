import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

function Header() {
  const [UserData, setUserData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user-details",
          {
            withCredentials: true, // Ensure cookies are sent
          }
        );

        setUserData(response.data.user);
      } catch (error) {
        console.error(
          "Error fetching user details:",
          error.response?.data || error.message
        );
      }
    };
    fetchUserDetails();
  }, []);

  const LogOutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sign-out",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(authActions.logout());
      navigate("/");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <>
      {UserData && (
        <div className="bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl">
              {UserData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{UserData.email}</p>
          </div>
          <div>
            <button
              onClick={LogOutHandler}
              className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

// import axios from 'axios';
// import React, { useEffect } from 'react'

// function Header() {
//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/v1/user-details', { withCredentials: true });
//                 ;
//                 console.log(response)
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         fetchUserDetails();
//     }
//     , [])
//   return (
//     <div className='bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12'>
//       <div className="flex flex-col items-center md:items-start ">
//         <p className="text-zinc-300">Profile</p>
//         <h1 className="text-3xl md:text-4xl lg:text-5xl">The Code Master</h1>
//         <p className="text-zinc-300 mt-1">smr@gmail.com</p>
//       </div>
//       <div>
//         <button className='bg-white px-4 py-2 rounded  text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300'>Log Out</button>
//       </div>
//     </div>
//   )
// }

// export default Header
