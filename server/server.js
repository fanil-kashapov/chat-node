
'use strict'
// set up ======================================================================
// get all the tools we need
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),

    morgan = require("morgan"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    session = require("express-session"),

    configDB = require("./config/dbConfig.js"),
    http = require("http").createServer(app),
    io = require('./lib/socket.js')(http);


// configuration ===============================================================
mongoose.connect(configDB.local); // connect to our database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
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

// Specify the views folder
app.set("views", `${__dirname}/views`);

app.set("view engine", "ejs"); // set up ejs for templating

app.use('/public', express.static('public'));
// allow CORS
// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
//   if (req.method == "OPTIONS") {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });

// required for passport
app.use(session({ secret: "keyboard cat", key: "sid", cookie: { secure: false } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./lib/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
// app.listen(port);


// Start the http server at port and IP defined before
http.listen(port, app.get("ipaddr"), () => {
  console.log(`Server up and running. Go to http://localhost:${port}`);
});
