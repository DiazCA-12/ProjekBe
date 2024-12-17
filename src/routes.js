const router = require("express").Router();
const express = require("express");
const {
  userroutes,
  productroutes,
  purchasesroutes,
} = require("../api/routes");


router.use("/api/users", userroutes);
router.use("/api/product", productroutes);
router.use("/api/purchases", purchasesroutes);

module.exports = router;