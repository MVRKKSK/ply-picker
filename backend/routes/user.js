const express = require("express");
const { requireSignin , isAuth , isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


const router = express.Router();

router.get("/secret/:userId", requireSignin , isAuth , isAdmin , (req, res ) => {
    res.json({
        user:req.profile
    })

})

router.param("userId", userById)

module.exports = router;