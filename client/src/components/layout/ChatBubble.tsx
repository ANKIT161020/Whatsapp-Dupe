import React from 'react';
import { Check } from 'lucide-react';

interface IMessage {
  id: string;
  text: string;
  from: 'me' | 'contact';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const ChatBubble: React.FC<{ message: IMessage }> = ({ message }) => {
  const isSentByMe = message.from === 'me';
  
  const bubbleClasses = `
    p-2 rounded-lg max-w-xs my-1
    ${isSentByMe ? 'self-end bg-[#144d37] text-white' : 'self-start bg-[#242626] text-white'}
  `;

  const renderStatus = () => {
    if (isSentByMe) {
      if (message.status === 'read') {
        return (
          <span className="flex items-center">
            <Check className="w-4 h-4 text-blue-400 -ml-1" />
            <Check className="w-4 h-4 text-blue-400 -ml-2" />
          </span>
        );
      }
      if (message.status === 'delivered') {
        return (
          <span className="flex items-center">
            <Check className="w-4 h-4 text-gray-400 -ml-1" />
            <Check className="w-4 h-4 text-gray-400 -ml-2" />
          </span>
        );
      }
      return <Check className="w-4 h-4 text-gray-400" />;
    }
    return null;
  };

  return (
    <div className={bubbleClasses}>
      <p>{message.text}</p>
      <div className="flex items-center justify-end text-xs text-gray-400 mt-1">
        <span>{message.timestamp}</span>
        <div className="flex ml-1">
          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
