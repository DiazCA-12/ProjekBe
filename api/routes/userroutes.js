const { loginUser, buatuser } = require("../controller/usercontroller");

const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register a new user
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nama:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", buatuser);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login a user
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

module.exports = router;
