import type { IConversationSummary } from '../services/messageAPI';
// import { APP_CONFIG } from '../config/constants';

// Interface for UI conversation representation
export interface UIConversation {
  wa_id: string;
  name: string;
  profilePicture?: string;
  lastMessage: string;
  timestamp: string;
  isGroup?: boolean;
  isCommunity?: boolean;
  unreadCount?: number;
  isPinned?: boolean;
  messageStatus?: 'sent' | 'delivered' | 'read';
}

// Helper function to convert API conversation to UI conversation
export const transformConversationForUI = (apiConversation: IConversationSummary): UIConversation => {
  // Extract contact name or use phone number as fallback
  const name = apiConversation.contactName || apiConversation.wa_id;
  
  
  // Extract last message text
  const lastMessage = apiConversation.text?.body || `${apiConversation.type} message`;
  
  // Format timestamp
  const timestamp = new Date(apiConversation.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Determine if the latest message is from me
  // A message is from "me" if the sender (from) is NOT the contact's wa_id
  const isFromMe = apiConversation.from !== apiConversation.wa_id;
  
  return {
    wa_id: apiConversation.wa_id,
    name,
    lastMessage: isFromMe ? `You: ${lastMessage}` : lastMessage,
    timestamp,
    messageStatus: isFromMe ? apiConversation.status : undefined, // Only show status for messages we sent
    // You can extend this with more UI-specific properties as needed
  };
};

// Helper function to get display name from conversation
export const getConversationDisplayName = (conversation: IConversationSummary): string => {
  return conversation.contactName || conversation.wa_id;
};
