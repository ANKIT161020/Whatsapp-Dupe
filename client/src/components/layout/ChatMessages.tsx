import React from 'react';
import ChatBubble from './ChatBubble';
import LoadingSpinner from '../LoadingSpinner';
import { useMessages } from '../../hooks/useMessages';
import type { IMessage } from '../../services/messageAPI';
import ChatBg from '../../assets/ChatBg.png';

interface ChatMessagesProps {
  selectedConversationWaId: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ selectedConversationWaId }) => {
  const { data: messages = [], isLoading, error } = useMessages(selectedConversationWaId || '');

  if (!selectedConversationWaId) {
    return (
      <div 
        className="flex-1 p-4 overflow-y-auto flex items-center justify-center"
        style={{
          backgroundImage: `url(${ChatBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-gray-400 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          Select a conversation to view messages
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className="flex-1 p-4 overflow-y-auto flex items-center justify-center"
        style={{
          backgroundImage: `url(${ChatBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex flex-col items-center bg-black/50 px-6 py-4 rounded-lg backdrop-blur-sm">
          <LoadingSpinner size="lg" className="text-gray-400 mb-2" />
          <div className="text-gray-400">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex-1 p-4 overflow-y-auto flex items-center justify-center"
        style={{
          backgroundImage: `url(${ChatBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center bg-black/50 px-6 py-4 rounded-lg backdrop-blur-sm">
          <div className="text-red-400 mb-2">Error loading messages</div>
          <div className="text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </div>
        </div>
      </div>
    );
  }

  // Transform API messages to UI format
  const transformMessage = (apiMessage: IMessage) => {
    // A message is from "me" if the sender (from) is NOT the contact's wa_id
    // This means we sent it TO the contact
    const isFromMe = apiMessage.from !== apiMessage.wa_id;
    
    return {
      id: apiMessage.id,
      text: apiMessage.text?.body || `${apiMessage.type} message`,
      from: isFromMe ? 'me' : 'contact' as 'me' | 'contact',
      timestamp: new Date(apiMessage.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: apiMessage.status,
      fullDate: new Date(apiMessage.timestamp), // Keep full date for grouping
    };
  };

  // Helper function to format date labels
  const formatDateLabel = (date: Date): string => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // Reset time to compare only dates
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msgDate = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Calculate difference in days
    const diffTime = today.getTime() - msgDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      // Within current week - show day name
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      // Older than a week - show full date
      return messageDate.toLocaleDateString('en-GB'); // dd/mm/yyyy format
    }
  };

  // Helper function to check if two dates are on the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const uiMessages = messages.map(transformMessage);

  // Group messages by date and add date separators
  const messagesWithDateSeparators: Array<{ type: 'message' | 'date'; data: any }> = [];
  
  uiMessages.forEach((message, index) => {
    const currentDate = message.fullDate;
    const previousDate = index > 0 ? uiMessages[index - 1].fullDate : null;
    
    // Add date separator if this is the first message or if the date changed
    if (!previousDate || !isSameDay(currentDate, previousDate)) {
      messagesWithDateSeparators.push({
        type: 'date',
        data: {
          id: `date-${currentDate.getTime()}`,
          label: formatDateLabel(currentDate)
        }
      });
    }
    
    // Add the message
    messagesWithDateSeparators.push({
      type: 'message',
      data: message
    });
  });

  return (
    <>
      <style>
        {`
          /* For Webkit browsers like Chrome, Safari */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }

          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          }
        `}
      </style>
      <div 
        className="flex-1 p-4 overflow-y-auto flex flex-col custom-scrollbar"
        style={{
          backgroundImage: `url(${ChatBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {messagesWithDateSeparators.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
              No messages yet
            </div>
          </div>
        ) : (
          messagesWithDateSeparators.map((item) => {
            if (item.type === 'date') {
              return (
                <div key={item.data.id} className="flex justify-center my-4">
                  <div className="bg-[#1d1f1f] backdrop-blur-sm px-3 rounded-lg">
                    <span className="text-xs text-gray-300 font-medium">
                      {item.data.label}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <ChatBubble key={item.data.id} message={item.data} />
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default ChatMessages;