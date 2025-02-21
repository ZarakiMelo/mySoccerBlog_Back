require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./src/routers");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

const port = parseInt(process.env.APP_PORT ?? "5050", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
