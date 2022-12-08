const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./v1/models/db");

const port = process.env.PORT || 8888;
const app = express();
app.use(cors());
//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token");
  next();
});

app.use(express.static("uploads"));

app.use(bodyParser.json());

app.use("/api/v1/users", require("./v1/routes/user.route"));
app.use("/api/v1/auth", require("./v1/routes/auth.route"));
app.use("/api/v1/demo", require("./v1/routes/demo.route"));
app.use("/api/v1/quiz", require("./v1/routes/quiz.route"));
app.use("/api/v1/courses", require("./v1/routes/courses.route"));
app.use("/api/v1/review", require("./v1/routes/review.route"));
app.use("/api/v1/quetions", require("./v1/routes/quetion.route"));
app.use("/api/v1/create-quiz", require("./v1/routes/create-quiz.route"));
app.use(
  "/api/v1/studentsQuizAnswer",
  require("./v1/routes/studentQuizResponse.route")
);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
