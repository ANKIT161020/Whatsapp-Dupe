import { Router } from 'express';
import MessageController from '@controllers/message.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: WhatsApp message management endpoints
 */

/**
 * @swagger
 * /message/conversations:
 *   get:
 *     summary: Get all conversations
 *     description: Fetches a list of all unique conversations, typically showing the latest message for each. This populates the left-hand chat list in the WhatsApp Web UI.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Conversations retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       wa_id:
 *                         type: string
 *                         description: WhatsApp ID of the contact
 *                         example: "919937320320"
 *                       contactName:
 *                         type: string
 *                         description: Name of the contact
 *                         example: "Ravi Kumar"
 *                       lastMessage:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: object
 *                             properties:
 *                               body:
 *                                 type: string
 *                                 example: "Hi, I'd like to know more about your services."
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-01-06T12:30:00.000Z"
 *                           type:
 *                             type: string
 *                             example: "text"
 *                       messageCount:
 *                         type: number
 *                         description: Total number of messages in this conversation
 *                         example: 5
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/conversations', MessageController.getConversations);

/**
 * @swagger
 * /message/messages/{waId}:
 *   get:
 *     summary: Get messages by WhatsApp ID
 *     description: Fetches all messages for a specific conversation identified by the contact's WhatsApp ID (wa_id). This populates the main chat window when a conversation is selected.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: waId
 *         required: true
 *         schema:
 *           type: string
 *         description: The WhatsApp ID of the contact whose messages are to be fetched
 *         example: "919937320320"
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Messages retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/messages/:waId', MessageController.getMessagesByWaId);

/**
 * @swagger
 * /message/messages:
 *   post:
 *     summary: Create a new message
 *     description: Simulates sending a new message from the application. This endpoint will store the message in the database. No external message sending occurs.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wa_id
 *               - from
 *               - to
 *               - type
 *               - text
 *             properties:
 *               wa_id:
 *                 type: string
 *                 description: WhatsApp ID of the contact
 *                 example: "919937320320"
 *               contactName:
 *                 type: string
 *                 description: Name of the contact
 *                 example: "Ravi Kumar"
 *               from:
 *                 type: string
 *                 description: Sender's phone number
 *                 example: "918329446654"
 *               to:
 *                 type: string
 *                 description: Receiver's phone number
 *                 example: "919937320320"
 *               type:
 *                 type: string
 *                 enum: [text, image]
 *                 description: Type of message
 *                 example: "text"
 *               text:
 *                 type: object
 *                 properties:
 *                   body:
 *                     type: string
 *                     description: Message content
 *                     example: "Thank you for your inquiry. We'll get back to you soon."
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Message created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/messages', MessageController.createMessage);

export default router;