// DEPENDENCIES
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.port;

// MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const Car = require("./models/car.js");

app.use(express.urlencoded({ extended: false }));

// ROUTES

//INDEX
// GET /ROOT ROUTE
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// New
app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});
// D.

// U.

// Create
//POST /cars
app.post("/cars", async (req, res) => {
  await Car.create(req.body);
  res.redirect("/cars/new");
});

// E.

// S.

//PORT
app.listen(port, () => {
  console.log(`Listening on port`, port);
});
