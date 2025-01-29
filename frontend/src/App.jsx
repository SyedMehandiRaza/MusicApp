import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout.jsx';


const App = () => {
  return (
    <div className=" ">
      <Router>
        <Routes >
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
          </Route >  
        </Routes>
      </Router>
    </div>
  )
}

export default App
 