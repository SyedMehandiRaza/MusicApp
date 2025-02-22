
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user");
const categoryApi = require("./routes/categories");
const podcastApi = require("./routes/podcast");
const cors = require("cors");

require("./conn/conn");
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173", // Adjust to your frontend port
        credentials: true
      }
));
app.use(cookieParser());


// routes
app.use("/api/v1", userApi);
app.use("/api/v1", categoryApi);
app.use("/api/v1", podcastApi);
// console.log("JWT SECRET:", process.env.SECRET_KEY);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
