
"use strict";
// set up ======================================================================
// get all the tools we need
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    flash = require("connect-flash"),

    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),

    http = require("http").createServer(app),
    io = require("./lib/socket.js")(http);


// configuration ===============================================================
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json()); // get information from html forms

app.use("/public", express.static("public"));
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

// routes ======================================================================
require("./lib/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport


// POST method to create a chat message
app.post("/message", function (request, response) {

  // The request body expects a param named "message"
  var message = request.body.message;

  // If the message is empty or wasn't sent it's a bad request
  if (_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, { error: "Message is invalid" });
  }

  // We also expect the sender's name with the message
  var name = request.body.name;

  // Let our chatroom know there was a new message
  io.sockets.emit("incomingMessage", { message: message, name: name });

  // Looks good, let the client know
  response.json(200, { message: "Message received" });

});


// Start the http server at port and IP defined before
http.listen(port, app.get("ipaddr"), () => {
  console.log(`Server up and running. Go to http://localhost:${port}`);
});
