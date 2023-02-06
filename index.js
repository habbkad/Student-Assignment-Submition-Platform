const express = require("express");
const env = require("dotenv");
const connect = require("./src/db");

//create ainstance of express
const app = express();

// dotenv config
env.config();

//connect to data base
connect();

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
  console.log("server started");
});

// Handle unhandled promise rejections
process.on("rejectionHandled", (error, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
