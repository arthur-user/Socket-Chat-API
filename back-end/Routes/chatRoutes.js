const express = require("express");
const {
  createChat,
  getUserChats,
  findChat,
} = require("../Controllers/chatController");

const router = express.Router();

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     description: Initializes a chat between two users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstId
 *               - secondId
 *             properties:
 *               firstId:
 *                 type: string
 *                 description: ID of the first user
 *               secondId:
 *                 type: string
 *                 description: ID of the second user
 *     responses:
 *       200:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Chat ID
 *                 members:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of user IDs
 *       400:
 *         description: Missing required fields
 */
router.post("/", createChat);

/**
 * @swagger
 * /api/chats/{userId}:
 *   get:
 *     summary: Get all chats for a user
 *     description: Retrieves all chat conversations associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose chats are being retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved user's chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Chat ID
 *                   members:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of user IDs
 *       404:
 *         description: User not found or no chats available
 */
router.get("/:userId", getUserChats);

/**
 * @swagger
 * /api/chats/find/{firstId}/{secondId}:
 *   get:
 *     summary: Find a chat between two users
 *     description: Retrieves a chat conversation between two users if it exists.
 *     parameters:
 *       - in: path
 *         name: firstId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the first user
 *       - in: path
 *         name: secondId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the second user
 *     responses:
 *       200:
 *         description: Chat found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Chat ID
 *                 members:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of user IDs
 *       404:
 *         description: Chat not found
 */
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
