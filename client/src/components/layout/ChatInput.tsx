import React, { useState } from 'react';
import { useSendMessage } from '../../hooks/useMessages';
import { APP_CONFIG } from '../../config/constants';

// Import PNG assets
import AttachIcon from '../../assets/AttachIcon.png';
import StickerIcon from '../../assets/StickerIcon.png';
import SendIcon from '../../assets/SendIcon.png';
import MicOutlineIcon from '../../assets/MicOutlineIcon.png';

interface ChatInputProps {
  selectedConversationWaId: string | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ selectedConversationWaId }) => {
  const [message, setMessage] = useState('');
  const sendMessageMutation = useSendMessage();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedConversationWaId) return;

    try {
      await sendMessageMutation.mutateAsync({
        waId: selectedConversationWaId,
        messageBody: message.trim(),
        from: APP_CONFIG.APP_PHONE_NUMBER, // Our number
        to: selectedConversationWaId, // Contact's number
      });
      
      setMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Failed to send message:', error);
      // You could add error handling here (e.g., show a toast)
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex items-center px-4 py-3 bg-[#0b1419] ">
      {/* Input container with all icons inside */}
      <div className="flex-1 flex items-center bg-[#242626] rounded-full pl-3 pr-3 py-3">

        {/* Attach icon */}
        <button
            type="button"
            className="w-8 h-7 hover:bg-[#202121] rounded-full transition-opacity cursor-pointer mr-1"
            title="Attach file"
          >
            <img src={AttachIcon} alt="Attach" className="w-full h-full" />
          </button>

        {/* Sticker icon - left side inside input */}
        <button
          type="button"
          className="w-8 h-7 mr-3 hover:bg-[#202121] rounded-full transition-opacity cursor-pointer flex-shrink-0"
          title="Add sticker"
        >
          <img src={StickerIcon} alt="Sticker" className="w-full h-full" />
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder={selectedConversationWaId ? "Type a message" : "Select a conversation first"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={!selectedConversationWaId || sendMessageMutation.isPending}
          className="flex-1 bg-transparent text-[#d1d7db] placeholder-[#8696a0] text-[15px] focus:outline-none disabled:opacity-50 mx-2"
        />
        
        {/* Right icons inside input */}
        <div className="flex items-center space-x-3 flex-shrink-0">

          {/* Send or Mic icon */}
          {message.trim() ? (
            <button
              type="submit"
              onClick={handleSendMessage}
              disabled={!selectedConversationWaId || sendMessageMutation.isPending}
              className="w-8 h-7 p-1.5 bg-[#00a884] hover:bg-[#008f6a] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <img src={SendIcon} alt="Send" className="w-full h-full" />
            </button>
          ) : (
            <button
              type="button"
              className="w-8 h-7 hover:bg-[#202121] rounded-full  transition-opacity cursor-pointer"
              title="Voice message"
            >
              <img src={MicOutlineIcon} alt="Mic" className="w-full h-full" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
