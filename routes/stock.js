const express = require("express");
const { requireSignIn, isAuth } = require("../controllers/auth");
const router = express.Router();

const { createStock, getAllStocks, getOneStock, searchStocks } = require("../controllers/stock");
const { userById } = require("../controllers/user");

router.post("/stock/:userId", requireSignIn, isAuth, createStock);
router.get("/stock/:userId", requireSignIn, isAuth, getAllStocks);
router.get("/stock/:userId/:stockByName", requireSignIn, isAuth, getOneStock);
router.get("/search/stock/:userId", requireSignIn, isAuth, searchStocks);

router.param("userId",userById);

module.exports = router;