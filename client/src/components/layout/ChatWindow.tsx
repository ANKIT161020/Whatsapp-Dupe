import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import type { IConversationSummary } from '../../services/messageAPI';

interface ChatWindowProps {
  conversation: IConversationSummary;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onBack }) => {
  return (
    <div
      className="flex flex-col h-screen"
      style={{
        backgroundImage: `url("../../assets/ChatBg.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ChatHeader conversation={conversation} onBack={onBack} />
      <ChatMessages selectedConversationWaId={conversation.wa_id} />
      <ChatInput selectedConversationWaId={conversation.wa_id} />
    </div>
  );
};

export default ChatWindow;
