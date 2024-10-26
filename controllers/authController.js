const { createUser, loginUser, checkUserIP } = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.errors) {
    errors = err.errors;
  }

  if (err.message === "Email already registered")
    errors.email = "Email already registered";

  if (err.message === "Limit account creation reached for today")
    errors.password = "Limit account creation reached for today";

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "example secret key", {
    expiresIn: maxAge,
  });
};

module.exports.auth_get = (req, res) => {
  res.render("auth");
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  const ip = req.ip;

  createUser(username, email, password, (err, result) => {
    if (err) {
      const errors = handleErrors(err);
      return res.status(400).json({ errors });
    }

    const token = createToken(result.id);
    checkUserIP(ip, (err) => {
      if (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors });
      }
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: result.id });
    });
  });
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    loginUser(email, password, (err, result) => {
      if (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors });
      }
      const token = createToken(result.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: result.id });
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
