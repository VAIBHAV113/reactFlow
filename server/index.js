const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_ENV)
  .then((res) => console.log(`connection successfull`))
  .catch((err) => console.log("Connect ot DB"));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.get("/api/position", (req, res) => {
  res.send("connection successfull");
});

const appRouter = require('./routers');
const Router = require('express');
app.use('/', appRouter);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
