import React from 'react'

function InputPodcast() {
  return (
    <div className='my-4 px-4 lg:px-12'>  
      <h1 className='text-2xl font-semibold'>Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row justify-between lg:justify-start">
        <div className="w-full lg:w-2/6 flex items-center  justify-center lg:justify-center">
           <div style={{border: "1px dashed black"}} className='custom-size flex items-center justify-center hover:bg-gray-100 transition-all duration-300'></div>
        </div>
      </div>
    </div>
  )
}

export default InputPodcast


