var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
var env = require("dotenv");
env.config();
const fileUpload = require("express-fileupload");
const session = require("express-session");
const bodyParser = require("body-parser");

//database connection
var db = require("./dataBase/connection");
db.connect();

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "jhab75fsvab",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, // session expires in 1 hour
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
const partialPath = path.join(__dirname, "views/partials");
hbs.registerPartials(partialPath);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
