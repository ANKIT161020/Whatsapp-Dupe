import { Message, IMessage } from '@models/message.model';

class MessageRepository {
  /**
   * Finds a message by its unique WhatsApp ID.
   * @param id The unique message ID (wamid.XXX).
   * @returns The found message document or null.
   */
  public static async findById(id: string): Promise<IMessage | null> {
    return Message.findOne({ id }).exec();
  }

  /**
   * Creates a new message document.
   * @param messageData The data for the new message.
   * @returns The newly created message document.
   */
  public static async create(messageData: Partial<IMessage>): Promise<IMessage> {
    const newMessage = new Message(messageData);
    return newMessage.save();
  }

  /**
   * Updates an existing message document.
   * @param id The unique message ID to update.
   * @param updateData The data to update.
   * @returns The updated message document or null if not found.
   */
  public static async update(id: string, updateData: Partial<IMessage>): Promise<IMessage | null> {
    return Message.findOneAndUpdate({ id }, { $set: updateData }, { new: true }).exec();
  }

  /**
   * Finds and updates a message, or creates it if it doesn't exist (upsert).
   * Useful for webhook processing where messages might be re-sent or status updates arrive before initial message.
   * @param query The query to find the document (e.g., { id: 'wamid.XXX' }).
   * @param update The update to apply.
   * @param options Mongoose options (e.g., { upsert: true, new: true }).
   * @returns The updated or newly created message document.
   */
  public static async findOneAndUpdateOrCreate(
    query: object,
    update: Partial<IMessage>,
    options: { upsert: boolean; new: boolean; setDefaultsOnInsert?: boolean }
  ): Promise<IMessage | null> {
    return Message.findOneAndUpdate(query, update, options).exec();
  }

  /**
   * Fetches all messages for a given WhatsApp ID (wa_id), sorted by timestamp.
   * @param waId The WhatsApp ID of the contact.
   * @returns An array of message documents.
   */
  public static async findMessagesByWaId(waId: string): Promise<IMessage[]> {
    // IMPORTANT: Avoid using orderBy() in Firestore queries, as it can lead to runtime errors like index missing due to the need for additional indexes.
    // If you need to sort data, fetch all the data and sort it in memory using javascript.
    const messages = await Message.find({ wa_id: waId }).exec();
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  /**
   * Fetches the latest message for each unique WhatsApp ID (conversation).
   * This is used to build the conversation list.
   * @returns An array of the latest message for each conversation.
   */
  public static async getLatestMessagesPerConversation(): Promise<IMessage[]> {
    // Aggregate to get the latest message for each unique wa_id
    const latestMessages = await Message.aggregate([
      // Sort by wa_id and then by timestamp descending
      { $sort: { wa_id: 1, timestamp: -1 } },
      // Group by wa_id and take the first document (which is the latest due to sorting)
      {
        $group: {
          _id: "$wa_id",
          latestMessage: { $first: "$$ROOT" }
        }
      },
      // Project to reshape the output to be just the message document
      { $replaceRoot: { newRoot: "$latestMessage" } },
      // Sort the conversations themselves by the latest message timestamp
      { $sort: { timestamp: -1 } }
    ]).exec();

    return latestMessages as IMessage[];
  }
}

export default MessageRepository;
