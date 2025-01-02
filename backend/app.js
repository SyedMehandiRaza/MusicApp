const express = require("express");

const app = express();

require("dotenv").config(); 

require("./conn/conn");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
