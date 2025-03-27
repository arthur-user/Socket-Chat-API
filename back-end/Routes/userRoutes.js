const express = require("express");
const {
  registerUser,
  userLogin,
  getUser,
  getAllUser,
} = require("../Controllers/usersController.js");

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the new user
 *               email:
 *                 type: string
 *                 description: Email of the new user
 *               password:
 *                 type: string
 *                 description: Password of the new user
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Error. Missing required fields
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized. Invalid credentials
 */
router.post("/login", userLogin);

/**
 * @swagger
 * /api/users/get/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to fetch
 *     responses:
 *       200:
 *         description: User successfully retrieved
 *       404:
 *         description: User not found
 */
router.get("/get/:userId", getUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllUser);

module.exports = router;
