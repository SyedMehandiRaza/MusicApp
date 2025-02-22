// // tailwind.config.js
// module.exports = {
//   content: [
//     './index.html',
//     './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind is looking at JS files too
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '78vh': '78vh',
        '500px': '500px',
      },
      width: {
        '100vw': '100vw',
        '75vw': '75vw',
      },
      // You can extend other properties similarly
      // Example for spacing (margin/padding)
      spacing: {
        '5px': '5px',
        '100px': '100px',
      },
    },
  },
  plugins: [],
};
