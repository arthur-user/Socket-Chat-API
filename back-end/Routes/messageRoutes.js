const express = require("express");
const { createMessage, getMessages } = require("../Controllers/messageController");

const router = express.Router();




/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - senderId
 *               - text
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: ID of the chat the message belongs to
 *               senderId:
 *                 type: string
 *                 description: ID of the user sending the message
 *               text:
 *                 type: string
 *                 description: Message content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Error. Missing required fields
 */
router.post("/", createMessage);

/**
 * @swagger
 * /api/messages/{chatId}:
 *   get:
 *     summary: Get all messages for a chat
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat to fetch messages for
 *     responses:
 *       200:
 *         description: A list of messages for the specified chat
 *       404:
 *         description: Chat not found
 */
router.get("/:chatId", getMessages);

module.exports = router;