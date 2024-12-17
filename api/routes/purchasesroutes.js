const { getPurchases, getPurchasesById, createPurchases, updatePurchases, deletePurchases } = require("../controller/purchasescontroller")

const express = require("express");
const router = express.Router();

router.get("/purchases", getPurchases);
router.get("/:id", getPurchasesById);
router.post("/", createPurchases);
router.put("/:id", updatePurchases);
router.delete("/:id", deletePurchases);
module.exports = router;