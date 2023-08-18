const mongoose = require("mongoose");
module.exports = {
  connect: () => {
PORT=4000
    mongoose.connect('mongodb://127.0.0.1:27017/newG');

    // Listen for the connection event and log the status
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB database");
    });

    // Listen for the error event and log the error
    mongoose.connection.on("error", () => {
      console.error("Failed to connect to MongoDB database:");
    });
  },
};
