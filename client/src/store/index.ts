import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './features/conversations/conversationSlice';
import messagesReducer from './features/messages/messageSlice';

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
