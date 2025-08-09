import { Request, Response } from 'express';
import MessageService from '@services/message.service'; // We'll create this service next
import apiResponse from '@utils/apiResponse';

class MessageController {
  /**
   * Fetches a summarized list of all unique conversations.
   * Each conversation typically includes the latest message and contact info.
   * @param req The Express request object.
   * @param res The Express response object.
   */
  public static async getConversations(req: Request, res: Response): Promise<void> {
    try {
      const conversations = await MessageService.getConversationsSummary();
      res.status(200).json(apiResponse(conversations, 'Conversations fetched successfully.'));
    } catch (error: any) {
      console.error('MessageController: Error fetching conversations:', error.message);
      res.status(500).send(`Error fetching conversations: ${error.message}`);
    }
  }

  /**
   * Fetches all messages for a specific WhatsApp ID (wa_id).
   * @param req The Express request object (expects waId in params).
   * @param res The Express response object.
   */
  public static async getMessagesByWaId(req: Request, res: Response): Promise<void> {
    const { waId } = req.params;
    if (!waId) {
      res.status(400).send('Bad Request: waId parameter is required.');
      return;
    }

    try {
      const messages = await MessageService.getMessagesByWaId(waId);
      res.status(200).json(apiResponse(messages, `Messages for ${waId} fetched successfully.`));
    } catch (error: any) {
      console.error(`MessageController: Error fetching messages for ${waId}:`, error.message);
      res.status(500).send(`Error fetching messages: ${error.message}`);
    }
  }

  /**
   * Simulates sending a new message from the application.
   * Stores the message in the database.
   * @param req The Express request object (expects message data in body).
   * @param res The Express response object.
   */
  public static async createMessage(req: Request, res: Response): Promise<void> {
    // Expected body: { waId: string, messageBody: string, from: string, to: string }
    const { waId, messageBody, from, to } = req.body;

    if (!waId || !messageBody || !from || !to) {
      res.status(400).send('Bad Request: waId, messageBody, from, and to are required.');
      return;
    }

    try {
      const newMessage = await MessageService.createNewMessage({ waId, messageBody, from, to });
      res.status(201).json(apiResponse(newMessage, 'Message created successfully.')); // 201 Created
    } catch (error: any) {
      console.error('MessageController: Error creating new message:', error.message);
      res.status(500).send(`Error creating message: ${error.message}`);
    }
  }
}

export default MessageController;
