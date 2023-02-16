const express = require("express");
const env = require("dotenv");
const connect = require("./src/config/api");
const error = require("./src/middleware/error");

// dotenv config
env.config({ path: "./src/config/.env" });

//routes
const studentRoutes = require("./src/routes/students_routes");
const assignmentRoutes = require("./src/routes/assignment_routes");

//connect to data base
connect();

//create ainstance of express
const app = express();

//body parser
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//create api endpoints
app.use("/api/v1/assignments/students", studentRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

app.use(error);

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
  console.log("server started");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
