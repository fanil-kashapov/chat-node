const mongoose = require("mongoose");

// create a schema for chat
const messageSchema = mongoose.Schema({
        created: Date,
        message: String,
        username: String,
       // room: String
    });

module.exports = mongoose.model("Message", messageSchema);
