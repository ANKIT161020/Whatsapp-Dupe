import { Request, Response } from 'express';
import WebhookService from '@services/webhook.service'; // We'll create this service next
import apiResponse from '@utils/apiResponse';

class WebhookController {
  /**
   * Handles incoming POST requests from the WhatsApp webhook.
   * Processes the payload and sends a response.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public static async processPayload(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    console.log('WebhookController: Received payload');

    try {
      // Delegate the actual processing logic to the WebhookService
      await WebhookService.processIncomingWebhook(payload);
      res.status(200).json(apiResponse(null, 'Webhook received and processed successfully.'));
    } catch (error: any) {
      console.error('WebhookController: Error processing payload:', error.message);
      res.status(500).send(`Error processing webhook payload: ${error.message}`);
    }
  }
}

export default WebhookController;
