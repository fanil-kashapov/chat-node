var Chat = require("./model/Message");

// app/routes.js
module.exports = function (app) {
    /* Server routing */

    // Handle route "GET /", as in "http://localhost:8080/"
    app.get("/", (req, res) => {
        // Render the view called "index"
        res.render("index");
    });

    // This route produces a list of chat as filterd by 'room' query
    app.get("/msg", (req, res) => {
    // Find
        Chat.find({
            room: req.query.room.toLowerCase(),
        }).exec((err, msgs) => {
            // Send
            res.json(msgs);
        });
    });
};
