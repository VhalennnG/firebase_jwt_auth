const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { rateLimit } = require("express-rate-limit");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const path = require("path");
const favicon = require("serve-favicon");

// middleware
app.use(express.json());
app.use(cookieParser());

// request rate limit
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 400,
  message: "Too many requests from this IP, please try again later.",
  statusCode: 429,
  standardHeaders: "draft-7",
});

app.use(favicon(path.join(__dirname, "public", "favicon.png")));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(limiter);

// view engine
app.set("view engine", "ejs");

// Start server in local
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/to-space", requireAuth, (req, res) => res.render("to-space"));
app.use(authRoutes);

// cookies
app.get("/set-cookies", (req, res) => {
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
