const path = require("path");
const express = require("express");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const connect = require("./src/config/api");
const error = require("./src/middleware/error");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//routes
const studentRoutes = require("./src/routes/students_routes");
const assignmentRoutes = require("./src/routes/assignment_routes");
const resourceRoutes = require("./src/routes/resources");
const authRoutes = require("./src/routes/auth");
const tutorRoutes = require("./src/routes/tutor_routes");

// dotenv config
env.config({ path: "./src/config/.env" });

//connect to data base
connect();

//create ainstance of express
const app = express();

//body parser
app.use(express.json());
//cookie parser
app.use(cookieParser());

//cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1800");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(
  cors({
    allowCredentials: true,
    origin: "http://localhost:3000",
  })
);
//app.use(express.urlencoded({ extended: true }));

//use file upload
app.use(fileUpload());

// Set static folder
app.use(express.static(path.join(__dirname, "assignments")));
app.use(express.static(path.join(__dirname, "profile")));

//create api endpoints
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tutor", tutorRoutes);

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
