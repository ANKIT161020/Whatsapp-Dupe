import React from 'react';

// Import PNG assets for message status
import SingleTickIcon from '../../assets/SingleTickIcon.png';
import DoubleUnSeenIcon from '../../assets/DoubleUnSeenIcon.png';
import DoubleSeenIcon from '../../assets/DoubleSeenIcon.png';

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
    relative p-3 rounded-lg max-w-xs my-1
    ${isSentByMe 
      ? 'self-end bg-[#005c4b] text-white rounded-tl-0' 
      : 'self-start bg-[#202c33] text-white rounded-tr-0'
    }
  `;

  const renderStatus = () => {
    if (isSentByMe) {
      if (message.status === 'read') {
        return (
          <img src={DoubleSeenIcon} alt="Read" className="w-6 h-5" />
        );
      }
      if (message.status === 'delivered') {
        return (
          <img src={DoubleUnSeenIcon} alt="Delivered" className="w-6 h-5" />
        );
      }
      return <img src={SingleTickIcon} alt="Sent" className="w-6 h-5" />;
    }
    return null;
  };

  return (
    <div className={bubbleClasses}>
      {/* Triangle tail for sent messages (top-right) */}
      {isSentByMe && (
        <div 
          className="absolute -top-[-1px] -right-[5px] w-0 h-0"
          style={{
            borderLeft: '8px solid #005c4b',
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent'
          }}
        />
      )}
      
      {/* Triangle tail for received messages (top-left) */}
      {!isSentByMe && (
        <div 
          className="absolute -top-[-1px] -left-[5px] w-0 h-0"
          style={{
            borderRight: '8px solid #202c33',
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent'
          }}
        />
      )}
      
      <p>{message.text}</p>
      <div className="flex items-center justify-end text-xs text-gray-400 mt-1">
        <span>{message.timestamp}</span>
        <div className="flex mb-1">
          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
