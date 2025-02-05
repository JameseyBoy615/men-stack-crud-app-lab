// DEPENDENCIES
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const port = process.env.port;

// MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const Car = require("./models/car.js");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// ROUTES

// HOME
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//INDEX
app.get("/cars", async (req, res) => {
  const allCars = await Car.find();
  res.render("cars/index.ejs", { cars: allCars });
});

// NEW
app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});

// DESTROY
app.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId);
  res.redirect("/cars");
});

// UPDATE
app.put("/cars/:carId", async (req, res) => {
  await Car.findByIdAndUpdate(req.params.carId, req.body);
  res.redirect(`/cars/${req.params.carId}`);
});

// Create
app.post("/cars", async (req, res) => {
  await Car.create(req.body);
  res.redirect("/cars/new");
});

// EDIT
app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/edit.ejs", {
    car: foundCar,
  });
});

// SHOW
app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/show.ejs", { car: foundCar });
});

//PORT
app.listen(port, () => {
  console.log(`Listening on port`, port);
});
