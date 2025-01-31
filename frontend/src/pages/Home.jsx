import React from "react";

const Home = () => {
  return (
    <div className="bg-green-100 px-12 h-screen flex flex-col justify-center">
      <div className="w-full flex items-center justify-center gap-4">
        <div className="lg:w-5/6 w-full flex items-center justify-center lg:justify-start">
          <h1 className="lg:text-8xl md:text-5xl text-3xl font-bold">
            Create & listen the <br />
            <h1 className="flex items-end justify-center lg:justify-start lg:mt-0 mt-2">
              P
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2113/2113324.png"
                  alt="O"
                  className="md:h-12 h-10 lg:h-20"
                />
              </span>
              dcast
            </h1>
          </h1>
        </div>
        <div className="w-1/6 lg:block hidden">
          <div className="-rotate-90 transform py-4 border text-xl border-black font-semibold rounded-full text-center bg-white">
            Scroll Down
          </div>
        </div>
      </div>
      <div className="mt-12 w-full flex lg:flex-row flex-col items-end justify-between">
        <div className="flex flex-col lg:items-start items-center justify-center">
          <p className="text-xl font-semibold lg:text-start text-center">
            Listen to the most popular podcasts on just one platform -{" "} 
            <b>PODCASTER</b>
          </p>
          <button className="px-6 py-4 mt-6 lg:mt-8 bg-green-900 text-white font-semibold rounded-full">Login to listen</button>
        </div>
        <div className="lg:mt-0 mt-6 ">
          <p className="text-zinc-600 font-bold lg:text-end text-center">Our app contains more than 100000+ music for you</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
