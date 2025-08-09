import React from 'react';
import { Paperclip, Smile, Mic } from 'lucide-react';

const ChatInput: React.FC = () => {
  return (
    <div className="flex items-center p-4 bg-[#161717]">
      <Smile className="w-6 h-6 text-gray-400 cursor-pointer mr-2" />
      <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer mr-2" />
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 p-2 bg-[#2a3942] text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21c063]"
      />
      <Mic className="w-6 h-6 text-gray-400 cursor-pointer ml-2" />
    </div>
  );
};

export default ChatInput;
