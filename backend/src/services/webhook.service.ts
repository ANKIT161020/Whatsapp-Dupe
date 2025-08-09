import MessageRepository from '@repositories/message.repository';
import { IMessage } from '@models/message.model';

class WebhookService {
  /**
   * Processes an incoming WhatsApp webhook payload.
   * This method extracts messages and status updates and persists them.
   * @param payload The raw webhook payload received from WhatsApp.
   */
  public static async processIncomingWebhook(payload: any): Promise<void> {
    console.log('WebhookService: Processing incoming webhook');

    // Access the 'entry' array from 'metaData' as per your sample payloads
    if (!payload.metaData || !payload.metaData.entry || payload.metaData.entry.length === 0) {
      console.warn('WebhookService: Payload does not contain expected metaData.entry structure.');
      return;
    }

    for (const entry of payload.metaData.entry) {
      if (!entry.changes || entry.changes.length === 0) {
        continue;
      }

      for (const change of entry.changes) {
        if (!change.value) {
          continue;
        }

        const value = change.value;
        const ourPhoneNumberId = value.metadata?.phone_number_id; // Our business phone ID

        // Determine the contact's wa_id and name, which is consistent across messages and statuses for a conversation
        let contactWaId: string | null = null;
        let contactName: string | null = null;
        if (value.contacts && value.contacts.length > 0) {
          contactWaId = value.contacts[0].wa_id;
          contactName = value.contacts[0].profile.name;
        }

        // Handle incoming/outgoing messages
        if (value.messages && value.messages.length > 0) {
          for (const msg of value.messages) {
            // Ensure wa_id and contactName are set, preferring contact info if available
            // For incoming messages, msg.from is the contact's wa_id
            // For outgoing messages, contactWaId (from value.contacts) is the recipient's wa_id
            const currentWaId = contactWaId || msg.from;
            const currentContactName = contactName || 'Unknown Contact';

            const newMessageData: Partial<IMessage> = {
              id: msg.id,
              wa_id: currentWaId, // Consistent contact identifier for conversation grouping
              contactName: currentContactName,
              from: msg.from,
              to: ourPhoneNumberId, // For incoming, this is our number. For outgoing, this is the recipient.
              type: msg.type,
              text: msg.text,
              timestamp: new Date(parseInt(msg.timestamp) * 1000), // Convert Unix timestamp to Date
              status: 'sent', // Initial status for new messages
              context: msg.context,
              image: msg.image // If image type, this will be present
            };

            // Use upsert to handle potential re-delivery or ensure uniqueness
            await MessageRepository.findOneAndUpdateOrCreate(
              { id: newMessageData.id },
               newMessageData,
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`WebhookService: Message ${newMessageData.id} inserted/updated.`);
          }
        }

        // Handle status updates (sent, delivered, read)
        if (value.statuses && value.statuses.length > 0) {
          for (const statusUpdate of value.statuses) {
            const messageIdToUpdate = statusUpdate.id || statusUpdate.meta_msg_id;
            if (messageIdToUpdate) {
              await MessageRepository.update(
                messageIdToUpdate,
                {
                  status: statusUpdate.status,
                  // Update the message's timestamp to the latest status timestamp
                  timestamp: new Date(parseInt(statusUpdate.timestamp) * 1000)
                }
              );
              console.log(`WebhookService: Message ${messageIdToUpdate} status updated to: ${statusUpdate.status}`);
            }
          }
        }
      }
    }
  }
}

export default WebhookService;
