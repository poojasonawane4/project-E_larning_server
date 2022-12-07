const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://topper:Topper123@learningplatform.4csh1av.mongodb.net/?retryWrites=true&w=majority"
);
const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("connected to db");
});

conn.on("disconnected", () => {
  console.log("disconnected from db");
});

conn.on("error", (err) => {
  console.log("could not connected to db", err);
});
