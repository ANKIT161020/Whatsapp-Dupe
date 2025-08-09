import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

// Interfaces for component props
interface IConversation {
  wa_id: string;
  name: string;
  profilePicture: string;
}

interface ChatWindowProps {
  conversation: IConversation;
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
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
