
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const authVolunteerRouter = require("./Routes/authVolunteerRouter");

mongoose.connect("mongodb://localhost:27017/sdg-app-api", { useNewUrlParser: true, useUnifiedTopology: true});

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/authVolunteer", authVolunteerRouter);

server.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
})
