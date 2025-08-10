import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { conversationsAPI, messagesAPI } from '../services/messageAPI';
import type { IConversationSummary, IMessage } from '../services/messageAPI';
import { APP_CONFIG } from '../config/constants';

// Query keys
export const queryKeys = {
  conversations: ['conversations'] as const,
  messages: (waId: string) => ['messages', waId] as const,
};

// Hook to fetch conversations
export const useConversations = () => {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: conversationsAPI.getConversations,
    staleTime: APP_CONFIG.CONVERSATIONS_STALE_TIME,
    refetchOnWindowFocus: true,
    refetchInterval: APP_CONFIG.CONVERSATIONS_REFETCH_INTERVAL,
  });
};

// Hook to fetch messages for a specific conversation
export const useMessages = (waId: string) => {
  return useQuery({
    queryKey: queryKeys.messages(waId),
    queryFn: () => messagesAPI.getMessagesByWaId(waId),
    enabled: !!waId, // Only run when waId is provided
    staleTime: APP_CONFIG.MESSAGES_STALE_TIME,
    refetchOnWindowFocus: true,
    refetchInterval: APP_CONFIG.MESSAGES_REFETCH_INTERVAL,
  });
};

// Hook to send a new message
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagesAPI.createMessage,
    onSuccess: (newMessage: IMessage) => {
      // Update the messages cache for the specific conversation
      queryClient.setQueryData<IMessage[]>(
        queryKeys.messages(newMessage.wa_id),
        (oldMessages = []) => [...oldMessages, newMessage]
      );

      // Update the conversations cache
      queryClient.setQueryData<IConversationSummary[]>(
        queryKeys.conversations,
        (oldConversations = []) => {
          const conversationIndex = oldConversations.findIndex(
            (conv) => conv.wa_id === newMessage.wa_id
          );

          if (conversationIndex !== -1) {
            // Update existing conversation with the new message as the latest
            const updatedConversations = [...oldConversations];
            updatedConversations[conversationIndex] = {
              ...updatedConversations[conversationIndex],
              ...newMessage, // Update with new message data
            };
            return updatedConversations.sort(
              (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          } else {
            // Add new conversation
            const newConversation: IConversationSummary = {
              ...newMessage,
            };
            return [newConversation, ...oldConversations];
          }
        }
      );

      // Invalidate queries to refetch latest data
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
      // You can add error handling here, like showing a toast notification
    },
  });
};
