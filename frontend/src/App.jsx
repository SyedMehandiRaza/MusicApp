import React, { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Categories from './pages/Categories.jsx';
import Profile from './pages/Profile.jsx';
import axios from 'axios';
import  { authActions } from "./store/auth";
 import {useDispatch } from 'react-redux';
import AddPodcast from './pages/AddPodcast.jsx';


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/check-cookie", {withCredentials: true});
        
        if(response.data.message){
          dispatch(authActions.login());
        };
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  },[]
  )
  return (
    <div className=" ">
      <Router>
        <Routes >
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/add-podcast' element={<AddPodcast />} />
          </Route >  
          <Route path="/" element={<AuthLayout />} >
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
 