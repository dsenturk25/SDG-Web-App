
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const async = require("async")

const app = express();

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const indexRouter = require("./Routes/indexRouter");
const authVolunteerRouter = require("./Routes/volunteerRouter");
const authOrganizationRouter = require("./Routes/organizationRouter");
const projectRouter = require("./Routes/projectRouter");
const adminRouter = require("./Routes/adminRouter");

const scheduleUpdates = require("./utils/scheduleUpdates");
const Volunteer = require("./models/Volunteer/volunteer");
const Project = require("./models/Projects/project");

const { addTimes, subtractTimes } = require("./utils/timeOperations");
const cookieParser = require("cookie-parser");

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sdg-app-api";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//yorum
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

dotenv.config({ path: path.join(__dirname, ".env") });

app.use(express.json());

app.set('trust proxy', 1);

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, path: "/admin" },
  store: new session.MemoryStore()
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, path: "/" },
  store: new session.MemoryStore()
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, path: "/organization" },
  store: new session.MemoryStore()
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/volunteer", authVolunteerRouter);
app.use("/organization", authOrganizationRouter);
app.use("/project", projectRouter);
app.use("/admin", adminRouter);

server.listen(PORT, () => {
  scheduleUpdates();
  console.log("Server is listening on port", PORT);
})
