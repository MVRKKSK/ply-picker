const express = require("express");
const router = express.Router();
const { requireSignin , isAuth , isAdmin } = require("../controllers/auth");
const { create, productId, remove, update, list, ListRelated, listBySearch } = require("../controllers/product");
const { userById } = require("../controllers/user");

router.post("/products/create/:userId" ,requireSignin , isAuth , isAdmin , create)



router.get("/products/:productId" , (req,res) => {
    res.json({
        product:req.product
    })
})

router.post("/products/by/search", listBySearch);

router.get("/products"  , list)
router.get("/products/related/:productId"  , ListRelated)

router.delete("/products/:productId/:userId" ,requireSignin , isAuth , isAdmin , remove)
router.put("/products/:productId/:userId" ,requireSignin , isAuth , isAdmin , update)
router.param("userId", userById)
router.param("productId",productId)

module.exports = router;