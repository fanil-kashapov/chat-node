
// set up ======================================================================
// get all the tools we need
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");

var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var configDB = require("./config/dbConfig.js");

// configuration ===============================================================
mongoose.connect(configDB.local); // connect to our database
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connection:");
});

require("./lib/passport")(passport); // pass passport for configuration

// set up our express application
app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json()); // get information from html forms

app.set("view engine", "ejs"); // set up ejs for templating

// allow CORS
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

// required for passport
app.use(session({
    secret: "chatsecret",
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./lib/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
