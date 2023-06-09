const express = require("express");
const path = require("path");
const errorHandler = require("errorhandler");
// const cookieParser = require("cookie-parser");
const client = require("./src/connection/connection");
require("dotenv").config();

const cors = require("cors");

// const booksRouter = require("./src/routes/books");
const thermometerRouter = require("./src/routes/thermometer");

const app = express();

app.use(cors());

const http = require("http");

const hostname = process.env.hostname;
const portServer = process.env.port_server;

app.listen(portServer, hostname, () => {
  console.log(`Server berjalan pada http://${hostname}:${portServer}`);
});

client.connect((err) => {
  if (err) {
    app.use(errorHandler());
  } else {
    console.log("Connected Database");
  }
});

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use((next) => {
//   console.log("Time : ", Date.now());
//   next();
// });
// app.use("/books", booksRouter);
app.use("/thermometer", thermometerRouter);

client.connect;
