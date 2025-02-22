import React from "react";
import { Link } from "react-router-dom";

function YourPodcast() {
  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcast</h1>
        <Link to="/add-podcast" className="px-4 rounded py-4 bg-black text-white font-semibold">Add Podcast</Link>
      </div>
      
    </div>
  );
}

export default YourPodcast;
