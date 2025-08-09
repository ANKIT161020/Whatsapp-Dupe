import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

// Define the shape of a message item, matching your backend's IMessage
interface IMessage {
  _id: string;
  id: string; // Unique WhatsApp message ID
  wa_id: string; // Contact's WhatsApp ID
  contactName?: string;
  from: string;
  to: string;
  type: string;
  text?: { body: string };
  image?: { mime_type?: string; sha256?: string; id?: string; link?: string; };
  timestamp: string; // ISO date string
  status: 'sent' | 'delivered' | 'read';
  context?: { message_id?: string; };
  createdAt: string;
  updatedAt: string;
}

interface MessagesState {
  messages: IMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Action to set all messages for the current conversation
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Ensure messages are sorted by timestamp
      state.loading = false;
      state.error = null;
    },
    // Action to add a new message to the current conversation (e.g., sent message)
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
      // Re-sort to maintain order after adding
      state.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    },
    // Action to update the status of an existing message
    updateMessageStatus: (state, action: PayloadAction<{ messageId: string; status: 'sent' | 'delivered' | 'read' }>) => {
      const { messageId, status } = action.payload;
      const messageToUpdate = state.messages.find(msg => msg.id === messageId);
      if (messageToUpdate) {
        messageToUpdate.status = status;
      }
    },
    // Actions for loading state
    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Action for error state
    setMessagesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Clear messages when changing conversations
    clearMessages: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  setMessages,
  addMessage,
  updateMessageStatus,
  setMessagesLoading,
  setMessagesError,
  clearMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
