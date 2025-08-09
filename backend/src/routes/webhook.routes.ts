import { Router } from 'express';
import WebhookController from '@controllers/webhook.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: WhatsApp Webhook processing endpoint
 */

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Receive and process WhatsApp webhook payloads
 *     description: This endpoint is designed to receive webhook notifications from the WhatsApp Business API, processing incoming messages and status updates (sent, delivered, read).
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload_type:
 *                 type: string
 *                 example: whatsapp_webhook
 *               _id:
 *                 type: string
 *                 example: conv1-msg1-user-test
 *               metaData:
 *                 type: object
 *                 properties:
 *                   entry:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         changes:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               field:
 *                                 type: string
 *                                 example: messages
 *                               value:
 *                                 type: object
 *                                 description: The actual message or status payload from WhatsApp.
 *             example:
 *               payload_type: "whatsapp_webhook"
 *               _id: "conv1-msg1-user"
 *               metaData:
 *                 entry:
 *                   - changes:
 *                       - field: "messages"
 *                         value:
 *                           contacts:
 *                             - profile:
 *                                 name: "Ravi Kumar"
 *                               wa_id: "919937320320"
 *                           messages:
 *                             - from: "919937320320"
 *                               id: "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhggMTIzQURFRjEyMzQ1Njc4OTA="
 *                               timestamp: "1754400000"
 *                               text:
 *                                 body: "Hi, I'd like to know more about your services."
 *                               type: "text"
 *                           messaging_product: "whatsapp"
 *                           metadata:
 *                             display_phone_number: "918329446654"
 *                             phone_number_id: "629305560276479"
 *     responses:
 *       200:
 *         description: Webhook received and processed successfully.
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
 *                   example: Webhook received and processed successfully.
 *                 data:
 *                   nullable: true
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', WebhookController.processPayload);

export default router;