const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const MongoDBStore = require("connect-mongo")(session);

const app = express();
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const uri = process.env.URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// Host and port
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const secret = process.env.SECRET;
const store = new MongoDBStore({
	url: uri,
	secret,
	touchAfter: 24 * 60 * 60
});

store.on("error", function(e) {
	console.log("SESSION STORE ERROR", e);
});

//dk y is use secret if it is undefined
const sessionConfig = {
	store,
	name: "session",
	secret: "course catalogue",
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser("course catalogue"));
app.use(session(sessionConfig));

// app.use(function(req, res, next) {
// 	res.locals.currentUser = req.user;
// 	res.locals.success = req.flash("success");
// 	res.locals.error = req.flash("error");
// 	next();
// });

// Require routes
const courseRouter = require("./routes/courseRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const teacherRouter = require("./routes/teacherRouter.js");
const departmentRouter = require("./routes/departmentRouter.js");

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/courses", courseRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/departments", departmentRouter);

app.get("*", function(req, res) {
  res.status(404).send("404 Not Found.");
});

app.listen(port, hostname, function() {
	console.log(`Server running at http://${hostname}:${port}/`);
});
