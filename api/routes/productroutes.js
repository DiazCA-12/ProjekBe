const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productcontroller");

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     description: Get all products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get("/product", getProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Get a product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single product
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Create a new product
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             namaproduct:
 *               type: string
 *             Category:
 *               type: string
 *             harga:
 *               type: number
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Update a product
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             namaproduct:
 *               type: string
 *             Category:
 *               type: string
 *             harga:
 *               type: number
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Delete a product
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete("/:id", deleteProduct);

module.exports = router;
