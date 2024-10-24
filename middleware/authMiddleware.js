const jwt = require("jsonwebtoken");
const db = require("../config/dbConfig");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if web token exists & is valid
  if (token) {
    jwt.verify(token, "example secret key", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/auth");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/auth");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if web token exists & is valid
  if (token) {
    jwt.verify(token, "example secret key", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);

        try {
          const userRef = db.collection("users").doc(decodedToken.id);
          const userDoc = await userRef.get();

          if (!userDoc.exists) {
            res.locals.user = null;
            next();
          } else {
            const userData = userDoc.data();
            res.locals.user = {
              id: decodedToken.id,
              username: userData.username,
              email: userData.email,
            };

            next();
          }
        } catch (error) {
          console.log(err);
          res.locals.user = null;
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const redirectIfLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    return res.redirect("/");
  }
  next();
};

module.exports = { requireAuth, checkUser, redirectIfLoggedIn };
