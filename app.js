const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const path = require("path");

// middleware
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(cors());

// view engine
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Start server in local
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/to-space", requireAuth, (req, res) => res.render("to-space"));
app.use(authRoutes);

// cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", false, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("you got this cookie");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something wrong!");
});

module.exports = app;
