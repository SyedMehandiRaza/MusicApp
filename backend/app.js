const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user");
const categoryApi = require("./routes/categories");
const podcastApi = require("./routes/podcast");
require("dotenv").config();
require("./conn/conn");
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1", userApi);
app.use("/api/v1", categoryApi);
app.use("/api/v1", podcastApi);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
