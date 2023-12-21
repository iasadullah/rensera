// //env variables envoking using node package
// require("dotenv").config();

// // creating express environment for node to work with apis
// const express = require("express");
// const mongooes = require("mongoose");
// const cors = require("cors");
// // Add this line at the top of your server file
// const path = require("path");

// const app = express();
// // ... existing code ...

// const workoutRoutes = require("./routes/workouts");
// //function to invoke express app (express is a function)

// //middleware
// app.use(cors());
// app.use(express.json());
// app.use(
//   "/generatedHtml",
//   express.static(path.join(__dirname, "generatedHtml"))
// );
// app.use(
//   "/output-web-resources",
//   express.static(path.join(__dirname, "generatedHtml", "output-web-resources"))
// );
// app.use((req, res, next) => {
//   console.log("Middleware running", req.path, req.method);
//   next();
// });

// app.use(
//   "/generatedHtml",
//   express.static(path.join(__dirname, "generatedHtml"))
// );
// //routes handler

// app.use("/api/workouts", workoutRoutes);

// //conncet to mongodb
// mongooes
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     //listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("Server listening on port 4000", process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log("Error connecting to mongodb", err);
//   });

const express = require("express");
const bodyParser = require("body-parser");
const IndesignRoutes = require("./routes/Indesign");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use("/api", IndesignRoutes);
// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ statusCode: err.status || 500, error: err.message });
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
