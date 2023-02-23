const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.set("view engine", "ejs");
app.set(path.join(__dirname, "public"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", loginRoutes);
//app.use("loginUser", userRoutes);

module.exports = app;
