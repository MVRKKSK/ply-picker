const express = require("express");
const router = express.Router();
const { requireSignin , isAuth , isAdmin } = require("../controllers/auth");
const { create, getCategories } = require("../controllers/category");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId" ,requireSignin , isAuth , isAdmin , create)

router.param("userId", userById)

router.get("/categories" , getCategories);

module.exports = router;