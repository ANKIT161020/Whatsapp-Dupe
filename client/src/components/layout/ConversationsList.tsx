import React from 'react';
import ConversationItem from './ConversationItem';
import LoadingSpinner from '../LoadingSpinner';
import { useConversations } from '../../hooks/useMessages';
import type { IConversationSummary } from '../../services/messageAPI';
import { transformConversationForUI } from '../../utils/conversationUtils';

interface ConversationsListProps {
  onSelectConversation: (conversation: IConversationSummary) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ onSelectConversation }) => {
  const { data: conversations = [], isLoading, error } = useConversations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <LoadingSpinner size="lg" className="text-gray-400 mb-2" />
          <div className="text-gray-400">Loading conversations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-400 mb-2">Error loading conversations</div>
          <div className="text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </div>
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">No conversations yet</div>
      </div>
    );
  }

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
            background-color: #4a5568;
            border-radius: 3px;
          }

          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #4a5568 transparent;
          }
        `}
      </style>
      <div className="flex flex-col w-full h-full overflow-y-auto custom-scrollbar">
        {conversations.map((apiConversation) => {
          const uiConversation = transformConversationForUI(apiConversation);
          return (
            <div key={apiConversation.wa_id} className="w-full max-w-full px-2">
              <ConversationItem
                conversation={uiConversation}
                onSelectConversation={() => onSelectConversation(apiConversation)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConversationsList;
