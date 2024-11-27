const express = require("express");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const app = express();
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./controllers/errorController");
const appError = require("./utils/appError");
const batchRouter = require("./routes/batchRouter");
const internshipRequestRouter = require("./routes/internshipRequestRouter");
const projectRouter = require("./routes/projectRouter");

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API!",
  });
});

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/api/users", userRouter);
app.use("/api/internshipRequests", internshipRequestRouter);
app.use("/api/batch", batchRouter);
app.use("/api/projects", projectRouter); // Register the project routes

// error handling Route

app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
