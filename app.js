const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Router = require("./routers");
const { JsonWebTokenError } = require("jsonwebtoken");
const { error } = require("console");


dotenv.config();

const app = express();


const dbURI = process.env.DATABASE;
console.log(dbURI)
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(Router);


if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    app.listen(port);
    console.log(`connected to mongodb and listening at port ${port}`);
  } catch (err) {
    console.error(err);
  }
}


connectDB()