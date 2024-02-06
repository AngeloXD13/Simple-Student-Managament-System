const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

const bodyParser = require("body-parser");



// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/students path
const routes = require("./controller/studentcontroller");

app.use("/api/students", routes);



// log your server is running and the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Click here to open: http://localhost:${port}`);
});

// Connect Database
const connectDB = require('./config/db');
connectDB();


// const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });


app.use(express.static(`${__dirname}/client/build`));

app.get("/health", (req, res) => {
  res.send({
    health: "UP",
  });
});

app.get("/*", function (req, res) {
  res.sendFile(`${__dirname}/client/build/index.html`, function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

