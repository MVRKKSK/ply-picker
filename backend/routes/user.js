const express = require("express");
const router = express.Router();
const { signup , signin , signout , googlelogin } = require("../controllers/user")

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.post("/googleLogin", googlelogin)

module.exports = router;