const { Router } = require("express");

const authController = require("../controllers/authController");
const { redirectIfLoggedIn } = require("../middleware/authMiddleware");

const router = Router();

router.get("/auth", redirectIfLoggedIn, authController.auth_get);
router.post("/signup", redirectIfLoggedIn, authController.signup_post);
router.post("/login", redirectIfLoggedIn, authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
