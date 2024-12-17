const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productcontroller")

const express = require("express");
const router = express.Router();

router.get("/product", getProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;