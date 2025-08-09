import { createSlice,type PayloadAction} from '@reduxjs/toolkit';

// Define the shape of a conversation item, matching what your backend returns
// For simplicity, we'll use IMessage as the conversation summary item, as per your backend's getConversationsSummary
interface IConversationSummary {
  _id: string;
  id: string; // Latest message ID
  wa_id: string; // Contact's WhatsApp ID
  contactName?: string;
  from: string;
  to: string;
  type: string;
  text?: { body: string };
  timestamp: string; // ISO date string
  status: 'sent' | 'delivered' | 'read';
  createdAt: string;
  updatedAt: string;
}

interface ConversationsState {
  conversations: IConversationSummary[];
  selectedConversationWaId: string | null; // The wa_id of the currently selected chat
  loading: boolean;
  error: string | null;
}

const initialState: ConversationsState = {
  conversations: [],
  selectedConversationWaId: null,
  loading: false,
  error: null,
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    // Action to set the list of conversations
    setConversations: (state, action: PayloadAction<IConversationSummary[]>) => {
      state.conversations = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Action to set the currently selected conversation
    setSelectedConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversationWaId = action.payload;
    },
    // Actions for loading state (e.g., when fetching from API)
    setConversationsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Action for error state
    setConversationsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Add/Update a single conversation summary (e.g., when a new message arrives)
    addOrUpdateConversation: (state, action: PayloadAction<IConversationSummary>) => {
      const newConversation = action.payload;
      const existingIndex = state.conversations.findIndex(
        (conv) => conv.wa_id === newConversation.wa_id
      );

      if (existingIndex !== -1) {
        // Update existing conversation (e.g., new latest message)
        state.conversations[existingIndex] = newConversation;
      } else {
        // Add new conversation
        state.conversations.unshift(newConversation); // Add to the beginning for latest
      }
      // Sort to ensure latest conversations are at the top
      state.conversations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setConversationsLoading,
  setConversationsError,
  addOrUpdateConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
