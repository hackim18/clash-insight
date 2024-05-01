if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const router = require("./routers");
const errorHandling = require("./middlewares/errorHandlers");
const app = express();
// const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandling);

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`);
// });

module.exports = app;
