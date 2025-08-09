import MessageRepository from '@repositories/message.repository';
import { IMessage } from '@models/message.model';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs for new messages

class MessageService {
  /**
   * Retrieves a summary of all unique conversations.
   * For each conversation, it gets the latest message and relevant contact info.
   * @returns A promise that resolves to an array of conversation summaries.
   */
  public static async getConversationsSummary(): Promise<IMessage[]> {
    console.log('MessageService: Fetching conversation summaries');
    // The repository method already handles the aggregation for latest messages
    const conversations = await MessageRepository.getLatestMessagesPerConversation();
    return conversations;
  }

  /**
   * Retrieves all messages for a specific WhatsApp ID (wa_id).
   * Messages are sorted by timestamp in ascending order.
   * @param waId The WhatsApp ID of the contact.
   * @returns A promise that resolves to an array of messages.
   */
  public static async getMessagesByWaId(waId: string): Promise<IMessage[]> {
    console.log(`MessageService: Fetching messages for waId: ${waId}`);
    const messages = await MessageRepository.findMessagesByWaId(waId);
    return messages;
  }

  /**
   * Creates a new message entry in the database, simulating a message sent from the app.
   * @param data An object containing waId, messageBody, from, and to.
   * @returns A promise that resolves to the newly created message document.
   */
  public static async createNewMessage(data: { waId: string, messageBody: string, from: string, to: string }): Promise<IMessage> {
    console.log(`MessageService: Creating new message for waId: ${data.waId}`);

    // Generate a unique ID for the new message.
    // In a real WhatsApp API scenario, the API would provide this ID for outgoing messages.
    // For simulation, we generate one.
    const newMessageId = `wamid.APP_SIMULATION.${uuidv4()}`;

    const messageData: Partial<IMessage> = {
      id: newMessageId,
      wa_id: data.waId,
      contactName: 'You', // Assuming 'You' are sending it, or we can look up the contact name if it exists
      from: data.from, // Our number
      to: data.to, // The recipient's number (the wa_id)
      type: 'text',
      text: { body: data.messageBody },
      timestamp: new Date(), // Current time
      status: 'sent' // Initial status
    };

    const newMessage = await MessageRepository.create(messageData);
    console.log(`MessageService: New message created with ID: ${newMessage.id}`);
    return newMessage;
  }
}

export default MessageService;
