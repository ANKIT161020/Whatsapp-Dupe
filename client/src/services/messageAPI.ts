import api from './api';

// Define interfaces matching the backend response format exactly
interface IMessage {
  _id: string; // MongoDB document ID
  id: string; // Unique WhatsApp message ID (e.g., wamid.XXX)
  wa_id: string; // Contact's WhatsApp ID
  contactName?: string;
  from: string; // Sender's number
  to: string; // Receiver's number
  type: string; // 'text', 'image', etc.
  text?: { body: string };
  image?: { 
    mime_type?: string; 
    sha256?: string; 
    id?: string; 
    link?: string; 
  };
  timestamp: string; // ISO date string
  status: 'sent' | 'delivered' | 'read';
  context?: { message_id?: string };
  createdAt: string; // MongoDB auto-generated
  updatedAt: string; // MongoDB auto-generated
}

// Conversation summary is just the latest message for each wa_id
interface IConversationSummary {
  _id: string; // MongoDB document ID
  id: string; // Latest message ID
  wa_id: string; // Contact's WhatsApp ID
  contactName?: string;
  from: string;
  to: string;
  type: string;
  text?: { body: string };
  image?: { 
    mime_type?: string; 
    sha256?: string; 
    id?: string; 
    link?: string; 
  };
  timestamp: string; // ISO date string
  status: 'sent' | 'delivered' | 'read';
  context?: { message_id?: string };
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface CreateMessageRequest {
  waId: string; // Contact's WhatsApp ID
  messageBody: string; // Message text content
  from: string; // Our number (sender)
  to: string; // Recipient number (should match waId for conversations)
}

// API functions
export const conversationsAPI = {
  // Get all conversations
  getConversations: async (): Promise<IConversationSummary[]> => {
    const response = await api.get<ApiResponse<IConversationSummary[]>>('/message/conversations');
    return response.data.data;
  },
};

export const messagesAPI = {
  // Get messages for a specific conversation
  getMessagesByWaId: async (waId: string): Promise<IMessage[]> => {
    const response = await api.get<ApiResponse<IMessage[]>>(`/message/messages/${waId}`);
    return response.data.data;
  },

  // Create a new message
  createMessage: async (messageData: CreateMessageRequest): Promise<IMessage> => {
    const response = await api.post<ApiResponse<IMessage>>('/message/messages', messageData);
    return response.data.data;
  },
};

// Export types for use in components
export type { IMessage, IConversationSummary, CreateMessageRequest };
