const { getPurchases, getPurchasesById, createPurchases, updatePurchases, deletePurchases } = require("../controller/purchasescontroller");

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /purchases:
 *   get:
 *     description: Get all purchases
 *     responses:
 *       200:
 *         description: A list of purchases
 */
router.get("/purchases", getPurchases);

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     description: Get a purchase by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Purchase ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single purchase
 */
router.get("/:id", getPurchasesById);

/**
 * @swagger
 * /purchases:
 *   post:
 *     description: Create a new purchase
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Purchase data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             product_id:
 *               type: integer
 *             jumlah:
 *               type: integer
 *             harga:
 *               type: number
 *     responses:
 *       201:
 *         description: Purchase created
 */
router.post("/", createPurchases);

/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     description: Update a purchase
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Purchase ID
 *         required: true
 *         type: integer
 *       - name: body
 *         in: body
 *         description: Purchase data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             product_id:
 *               type: integer
 *             jumlah:
 *               type: integer
 *             harga:
 *               type: number
 *     responses:
 *       200:
 *         description: Purchase updated
 */
router.put("/:id", updatePurchases);

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     description: Delete a purchase
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Purchase ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Purchase deleted
 */
router.delete("/:id", deletePurchases);

module.exports = router;
