const path = require("path");
const express = require("express");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const connect = require("./src/config/api");
const error = require("./src/middleware/error");
const fileUpload = require("express-fileupload");

//routes
const studentRoutes = require("./src/routes/students_routes");
const assignmentRoutes = require("./src/routes/assignment_routes");
const authRoutes = require("./src/routes/auth");

// dotenv config
env.config({ path: "./src/config/.env" });

//connect to data base
connect();

//create ainstance of express
const app = express();

//body parser
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

//use file upload
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, "assignments")));
app.use(express.static(path.join(__dirname, "profile")));

//create api endpoints
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/auth", authRoutes);

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
