// import React from "react";
// import { Link, Links } from "react-router-dom";

// const cat = [
//   {
//     name: "Comedy",
//     color: "bg-purple-200",
//     to: "/categories/Comedy",
//     img: "https://yt3.googleusercontent.com/5gcWKghLDd4c1lEf5Rdhuz60rKeppWvb069mYU@s_jRcd03Ayq4jtn9c6QguCZDAyibzN2Bk.jpg",
//   },
//   {
//     name: "Business",
//     color: "bg-green-200",
//     to: "/categories/Business",
//     img: "https://img.freepik.com/free-vector/hand-drawn-business-innovation_23-2149153450.jpg",
//   },
//   {
//     name: "Education",
//     color: "bg-red-200",
//     to: "/categories/Education",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPhUBK1c59nkN1XHQu410qHhoC2vX4e37CA8s",
//   },
//   {
//     name: "Hobbies",
//     color: "bg-zinc-200",
//     to: "/categories/Hobby",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6abnshmeFbwujFSzvsH_ngeFxw-crjDCSAA&s",
//   },
//   {
//     name: "Government",
//     color: "bg-indigo-200",
//     to: "/categories/Government",
//     img: "https://www.whitehouse.gov/wp-content/uploads/2021/01/us-capitol.jpg",
//   },
// ];

// const Categories = () => {
//   return (
//     <div className="h-screen lg:h-[78vh]">
//       <div className="px-4 lg:px-12 py-4 grid gird-cols-2 md:gird-cols-3 lg:grid-cols4 gap-4">
//         {cat.map((items, i) => (
//           <Link
//             to={items.to}
//             key={i}
//             className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 transform transition-all duration-300 relative h-[22vh] overflow-hidden`}
//           >
//             <div>{items.name}</div>
//             <div className="w-full flex items-center justify-end absolute -bottom-2 -right-2">
//                 <img src={items.img} alt="category" className="rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]" />
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;




import React from "react";
import { Link } from "react-router-dom";
import '../custom.css';


const categories = [
  {
    name: "Comedy",
    color: "bg-purple-200",
    to: "/categories/Comedy",
    img: "https://img.freepik.com/premium-photo/circus-clown-performs-number_186673-90.jpg?w=900",
  },
  {
    name: "Business",
    color: "bg-green-200",
    to: "/categories/Business",
    img: "https://img.freepik.com/free-vector/hand-drawn-business-innovation_23-2149153450.jpg",
  },
  {
    name: "Education",
    color: "bg-red-200",
    to: "/categories/Education",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPhUBK1c59nkN1XHQu410qHhoC2vX4e37CA8s",
  },
  {
    name: "Hobbies",
    color: "bg-zinc-200",
    to: "/categories/Hobby",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6abnshmeFbwujFSzvsH_ngeFxw-crjDCSAA&s",
  },
  {
    name: "Government",
    color: "bg-indigo-200",
    to: "/categories/Government",
    img: "https://www.whitehouse.gov/wp-content/uploads/2021/01/us-capitol.jpg",
  },
];

const Categories = () => {
  return (
    <div className="h-screen lg:h-78vh -z-10">
      <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            style={{backgroundImage: `url(${item.img})`}}
            className={`rounded px-8 py-4 text-xl font-semibold ${item.color}  hover:scale-105 shadow-xl transition-all duration-300 relative h-40 overflow-hidden flex justify-center items-center z-0`}
          >
            <div className="text-white">{item.name}</div>
            <div className="w-[full] flex items-center justify-end absolute -bottom-2 right-2">
              {/* <img
                src={item.img}
                alt={item.name}
                className="rounded z-10 rotate-12 h-28 md:h-[17vh] lg:h-[18vh]"
              /> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
